const express = require("express");
const router = express.Router();
const auth = require("../middleware/authorization");
const { check, validationResult } = require("express-validator");
let multer = require("multer");
const {Storage} = require("@google-cloud/storage");
const Product = require("../models/Product");

const memoryStorage = multer.memoryStorage;
multer = multer({
    storage:memoryStorage(),
    limits: {
        fileSize: 2*1024*1024*1024,
    }
});


const storage = new Storage({
    projectId: process.env.PROJECT_ID,
    keyFilename: process.env.GCLOUD_KEY_FILE,
});
const bucket = storage.bucket(process.env.GCLOUD_STORAGE_BUCKET);



router.post(
    "/",
    [   auth, 
        [   check("name","Name is Required").not().isEmpty(), 
            check("description","Description is Required").not().isEmpty(),
            check("category","Category is Required").not().isEmpty(),
            check("price","Price is Required").not().isEmpty(),
            check("quantity","Quantity is Required").not().isEmpty(),
        ],
    ],
    async (req,res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array});
        }

        try{
            const {name, description, category, price, brand, quantity} = req.body;
            const newProduct = new Product({
                userId: req.user.id,
                name, 
                description,
                category,
                price,
                brand,
                quantity
            });
    
            const product = await newProduct.save();
            res.json(product); //no use here
        } catch(error){
            console.error(error.message);
            res.status(500).send("Server error");
        };


});

//get all products
router.get("/", async (req,res) => {
    try{
       const products =  await Product.find();
       res.json(products);


    } catch(error){
        console.error(error.message);
        res.status(500).send("Server error");
    };
});


router.get("/:id", async (req,res) => {
    try{
       const product =  await Product.findById(req.params.id);
       if(!product){
        return res.status(404).json({msg: "Product was not found"});
       } 
       
       res.json(product);
            //sets props/store state in component (also in mount)
            //and in return on willreceiveprops sets local state and shows
            //(no need local state if directly showing props)
            //same for above get all products api
    } catch(error){
        console.error(error.message);
        res.status(500).send("Server error");
    };
});


router.get("/instructors/:id", async(req, res) => {
    try{
        const products =  await Product.find({userId: req.params.id});
           //or can do other way of decode id in server from auth
              //(instead of decoding and passing id from client)
        res.json(products);
    } catch(error){
         res.status(500).send("Server error");
    };
});


router.post("/upload/thumbnail", auth, multer.single("file"), async(req, res) => {
    try{
        if(!req.file){
            res.status(400).send("No file uploaded");
            return;
        }

        const id = req.user.id;
        const {productId, multiple} = req.query;
        
        const blob = bucket.file(`${id}/${productId}/${req.file.originalname}`);
        const blobStream = blob.createWriteStream();
        blobStream.on('error', (err) => {
            console.log(err);
        });

        blobStream.on("finish", async ()=> { //after finished uploading finish event called
            //this public url can be used to directly access the file via http
            // const publicUrl = format(
            //     `https://storage.googleapis.com/${bucket.name}/${blob.name}`
            // );
            // res.status(200).send(publicUrl);
           
            await blob.makePublic();

            if(multiple){
                await Product.findOneAndUpdate(
                    {_id: productId}, 
                    {$push: {images: blob.metadata.mediaLink}},  //get images and create set from array and then use $set so that no duplicate images
                    {new: true, upsert: true},
                );
            }else{
                await Product.findByIdAndUpdate(
                    {_id: productId}, 
                    {$set: {thumbnail: blob.metadata.mediaLink}},
                    {new: true},
                );
            }

            res.status(200).send({msg: `Successfully Uploaded ${req.file.originalname}`});
        });

        blobStream.end(req.file.buffer); //upload to the blob


    } catch(error){
         res.status(500).send("Server error");
    };
});



module.exports = router;
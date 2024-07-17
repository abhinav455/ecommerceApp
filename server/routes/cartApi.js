const express = require("express");
const router = express.Router();
const auth = require("../middleware/authorization");
const {isEmpty} = require("lodash");
const Cart = require("../models/Cart");
const Product = require("../models/Product");


router.get("/", auth, async (req,res) => {
    try{ 
       const userId = req.user.id; 
       const carts =  await Cart.find({userId});
       if(isEmpty(carts)){
        return res.send({products:[]})
       }

       let retrievedCart;
       carts.forEach((cart) => {
         if(!cart.fulfilled){
            retrievedCart = cart;
         }
       });

       let products = [];
       let result = {products:[]};
       if(!isEmpty(retrievedCart)){
         products = retrievedCart.products.map(async product => {
            return await Product.findById(product)
         });

         products = await Promise.all(products);
         result = {...retrievedCart.toJSON(), products};
       }

       res.send({cart: result});


    } catch(error){
        res.status(500).send("Server error");
    };
});


//remove from cart
router.put("/:id", auth, async (req, res) => {
    try{
        const cartId = req.params.id;
        const product = req.body.product;
        await Cart.updateOne(
            {_id: cartId},
            {$pullAll: {products: [product]}} //when product is single id or list of id both work
        );

        const cart = await Cart.findById({_id: cartId});
        let value = cart.products.map(async (id) => await Product.findById(id));
        value = await Promise.all(value);

        res.send({cart: {...cart.toJSON(), products: value}});

    } catch(err){
        res.status(500).send("Server error");
    }
});

       //add a product to cart for a user
router.post("/", auth, async (req, res) => {
    try{
        const userId = req.user.id; 
        const {products} = req.body;
        const carts =  await Cart.find({userId});

        let cart, unfulfilledCart;
        const hasValidCarts = carts.reduce((acc, val) => {
            if(!val.fulfilled){
                unfulfilledCart = val;
            }
            return acc && val.fulfilled; //hasvalid- has all fulfilled cart   
        }, true);

        if(hasValidCarts) {  //no unfulfilled cart   //or use !isEmpty(unfulfilledCart)
            cart = new Cart({userId, products}); //products: [product._id]
            cart = await cart.save();
        } else{
           const stringProduct = [
                ...unfulfilledCart.products, ...products
           ].map(product => product.toString()); //using string and set for duplicates
           const newProducts = Array.from(new Set(stringProduct));

           cart = await Cart.findByIdAndUpdate({_id: unfulfilledCart._id}, 
            {products: newProducts}     //{$set: newCart}, {new: true}
            );  
           cart =  await Cart.findById({_id: unfulfilledCart._id}); //findByIdAndUpdate returns old cart sometimes
        }

        let value = cart.products.map(async (id) => await Product.findById(id));
        value = await Promise.all(value);
        res.send({cart: {...cart.toJSON(), products: value}}); //here {responseobj} will just return responseobj.toJSON(), not {responseobj: responseobj.toJSON()}

    } catch(err){
        res.status(500).send("Server error");
    }
})








module.exports = router;

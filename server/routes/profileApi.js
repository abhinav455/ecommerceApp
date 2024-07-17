const express = require("express");
const router = express.Router();
const auth = require("../middleware/authorization");
const { check, validationResult } = require("express-validator");
const Profile = require("../models/Profile");
const Product = require("../models/Product");
const User = require("../models/User");


router.get("/:id", async (req, res) => {
  try {
    const profile = await Profile.findOne({ userId: req.params.id });
    if (!profile) {
      return res.status(400).json({ msg: "There is no such profile" });
    }
    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

router.post(
  "/",
  [
    auth,
    [
      check("address", "Address is required").not().isEmpty(),
      check("bio", "Bio is Required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array });
    }

    const {
      website,
      address,
      bio,
      facebook,
      instagram,
      twitter,
      youtube,
      linkedin,
    } = req.body;

    const profileData = {
      userId: req.user.id,
      address,
      bio,
    };
    if (website) profileData.website = website;
    profileData.socialMedia = {};
    if (facebook) profileData.socialMedia.facebook = facebook;
    if (instagram) profileData.socialMedia.instagram = instagram;
    if (twitter) profileData.socialMedia.twitter = twitter;
    if (youtube) profileData.socialMedia.youtube = youtube;
    if (linkedin) profileData.socialMedia.linkedin = linkedin;

    try {
      //update  
      let profile = await Profile.findOne({ userId: req.user.id });
      if (profile) {
        profile = await Profile.findOneAndUpdate(
          { userId: req.user.id },
          { $set: profileData },
          { new: true }
        );
        return res.json(profile ); 
      }
     
      //create 
      const newProfile = new Profile(profileData);
      await newProfile.save();
      res.json(newProfile);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  }
);


router.delete("/", auth, async (req, res) => {
    try{

      
        const products = await Product.find({userId: req.user.id});
        products.forEach(async product =>{
            await Product.findByIdAndDelete(product._id);
            //await Product.findOneAndDelete({_id: product.id}); 
        });
        await Profile.findOneAndDelete({userId: req.user.id}); 
        await User.findOneAndDelete({_id: req.user.id});

        res.json({msg: "User details completely deleted"});

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
    }    
});


module.exports = router;

const express = require("express");
const router = express.Router();
const auth = require("../middleware/authorization");
const { stripeSecretKey} = require("../config/keys");
const stripe = require("stripe")(stripeSecretKey );
const User = require("../models/User")


router.post("/", auth, async (req, res) => {
    try{

        const { cart } = req.body;  //can pass shipping address in props also from react shipping state
        const amount= cart.products.reduce((acc, product)=> (acc+product.price) , 0) * 100;

        const user = await User.findById(req.user.id);

        const customer = await stripe.customers.create({  //pass the cart id and userid in metadata
            name: user.name,
            email: user.email,
          });


        const paymentIntent= await stripe.paymentIntents.create({
            customer: customer.id,
            amount,
            currency: "usd",
            metadata: {
                cartId: cart._id,
                userId: user._id.toJSON(),   //this gives number, else will give objectId type OR string(if JSON.stringify(user._id)) 
            },
        });

        res.send({clientSecret: paymentIntent.client_secret});
    } catch(err){
        res.status(500).send("Server error");
    }   
});



module.exports = router;

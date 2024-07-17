const express = require("express");
const router = express.Router();
const auth = require("../middleware/authorization");
const { stripeSecretKey, stripeEndpointSecret } = require("../config/keys");
const stripe = require("stripe")(stripeSecretKey );
const Payment = require("../models/Payment");
const Cart = require("../models/Cart");
const Product = require("../models/Product"); 


async function handlePaymentIntentSucceeded(paymentIntent) {

    //const customer = await stripe.customers.retrieve(paymentIntent.customer);
    const {userId, cartId} = paymentIntent.metadata;
    await Cart.findByIdAndUpdate({_id: cartId}, 
        {fulfilled: true}    
    ); 

    let payment = new Payment({userId, cartId, amount: paymentIntent.amount/100});
    await payment.save();

    const theCart = await Cart.findById(cartId);
    theCart.products.forEach(async (productId) => {
        let product = await Product.findById(productId);
        const qty = Number(product.quantity) -1;
        await Product.findByIdAndUpdate({_id: productId}, 
            {quantity: qty}    
        ); 
    } );


}



router.post("/",  express.raw({ type: 'application/json' }), async (req, res) => {
    try{
        console.log("abc");
        let event = req.body;
        try {
            const signature = req.headers['stripe-signature']; //verify signature with endpoint secret, so that we know the webhook endpoint which forwarded to is correct

            event =  stripe.webhooks.constructEvent(
              req.body,
              signature,
              stripeEndpointSecret
            );
        } catch (err) {
            return res.status(400).send(`⚠️  Webhook signature verification failed.`+ err.message);
        }


        switch (event.type) {
            case 'payment_intent.succeeded':
                const paymentIntent = event.data.object;
                await handlePaymentIntentSucceeded(paymentIntent);
              break;
            default:
                return res.status(400).send(`Unhandled event type ${event.type}.`);
        }
  
        res.send("confirmed payment");

    } catch(err){
        res.status(500).send("Server error" + err.message);
    }   
});


module.exports = router;


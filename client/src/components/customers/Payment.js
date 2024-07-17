import React, {useState} from "react";
//import StripeCheckout from "react-stripe-checkout";
import {loadStripe} from "@stripe/stripe-js";
import {
    PaymentElement,
    Elements,
    useStripe,
    useElements
} from "@stripe/react-stripe-js";
import {Button} from "antd";
import axios from "axios";
import {getServer, getClientServer} from "../../util";


const stripePromise = loadStripe("pk_test_51PZxf0EAlurFV4iCujVXlLkVWOtXfR3bCvjSPmMwukxdvb2JgHNauCNPxEUrOSiCdCb5kGMTmtHCMdSTPAZjT60j00mynN6IRf");




const CheckoutForm =  (props) => {
    const stripe = useStripe();
    const elements = useElements();
    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);


    const paymentElementOptions = {
        layout: "tabs"
    };
    const config = {
        headers:{
            "Content-Type": "application/json",          
        },     
    };




    const makePayment = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }
        
        setIsLoading(true);
        const {error: submitError} = await elements.submit(); 
        if (submitError) {
            // Show error to your customer
            setMessage(submitError.message);
            setIsLoading(false);
            return;
        }

        let clientSecret;
        try{   
        const res = await axios.post(`${getServer()}/api/payment`, {cart: props.cart, total: props.total}, config);
        console.log(res);
        clientSecret = res.data.clientSecret;
        }catch(err) { 
            setMessage(err.message);
            setIsLoading(false);
            return;
        }



        //`Elements` instance that was used to create the Payment Element
        //when this fn is called, <PaymentElement> is displayed and  collects data and fills the element state
        const {error} = await stripe.confirmPayment({
            elements,
            clientSecret,
            confirmParams: {
              return_url: `${getClientServer()}/paymentconfirm`,   //add a payment succcess display page and redirect to homepage like in swiggy, even if close app in server webhook order placed and on open app on mount get new state from server and display
            },
            // Uncomment below if you only want redirect for redirect-based payments
            // redirect: "if_required",
        });

             // This point will only be reached if there is an immediate error when confirming the payment. Otherwise, your customer will be redirected to your `return_url`.
        if (error.type === "card_error" || error.type === "validation_error") {
         setMessage(error.message);
        } else {
          setMessage("An unexpected error occurred.");
        }
        setIsLoading(false);

    }    

   
       
    return (
      <div>
        <PaymentElement  options={paymentElementOptions}/> 
        <br/>
        <Button type="primary" disabled={isLoading || !stripe || !elements} onClick={makePayment}>
            <span id="button-text">
             {isLoading ? <div className="spinner" id="spinner"></div> : "Checkout"}
            </span> 
        </Button>   
        {message && <div>{message}</div>} 
      </div>    
    );

}







function Payment(props) {

const appearance = {
    theme: 'stripe',
    };   
  
const options = {
    mode: 'payment',
    amount: props.total,
    currency: 'usd',
    appearance,
    };  

  return (
   <Elements stripe={stripePromise} options={options}>
        <CheckoutForm {...props}/>
   </Elements>
  );
}

export default Payment;

import React, {useEffect, useRef, useState} from 'react';
import { Flex, Spin } from 'antd';
import {useNavigate, useLocation} from "react-router-dom"; //useParams


const PaymentConfirm = () => {

  let navigate= useNavigate(), location= useLocation();  
  let [paymentIntentId, setPaymentIntent] = useState("");


  const firstUpdate = useRef(true); 
  useEffect(() => {
  //   if(firstUpdate.current){
  //     firstUpdate.current = false;
  //     return;
  // }

  setPaymentIntent(new URLSearchParams(location.search).get("payment_intent")); 
  //setPaymentIntentClientSecret(new URLSearchParams(location.search).get("payment_intent_client_secret");
  //get payment intent from stripe using paymentIntentId and  paymentIntentClientSecret if possible and verify and show details or dont do okay only
  setTimeout(()=> navigate( "/"), 3000 );

  },[]);

  return (
    <Flex align="center" gap="middle"> 
    <Spin size="large" />
    <div>{`Your Order is Placed with Payment Ref: ${paymentIntentId}. Thanks for Shopping`}</div>   
  </Flex>

  )
}

export default PaymentConfirm;
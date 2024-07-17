import React, {useEffect, useRef} from "react";
import "./App.css";
import {Provider} from "react-redux";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import store from "./store";
import setAuthToken from "./util/setAuthToken";
import {setCurrentUser} from "./actions/authActions";
import { grabProductsFromStorage } from "./actions/cartActions";

//importing general components
import ProtectedRoute from "./components/general/ProtectedRoute";

//landing components
import Landing from "./components/landing";
import ProductDetails from "./components/landing/ProductDetails";


//dashboard components
import Dashboard from "./components/dashboard";
import Home from "./components/dashboard/components/Home";
import AddProduct from "./components/dashboard/components/AddProduct";
import Products from "./components/dashboard/components/Products";
import AddProfile from "./components/dashboard/components/AddProfile";
import Profile from "./components/dashboard/components/Profile";

//customers component
import Cart from "./components/customers/Cart"; 
import PaymentConfirm from "./components/customers/PaymentConfirm"; 

//user components
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";



function App(props) {


  if(localStorage.token){
    setAuthToken(localStorage.token);
 } //as other dispatch are run in parallel in async thus it may not be set


  const firstUpdate = useRef(true); 
  useEffect(() => {
    if(firstUpdate.current){
      firstUpdate.current = false;
      return;
  }

    // if(localStorage.token){ //runs once when component created/reload, 
    //   //rest time added in code to run on login/register action reducer
    //   setAuthToken(localStorage.token); //set axios header
    // }

     store.dispatch(setCurrentUser()); 
        //store current user in state from token once didmount 


    
              //runs once when component created/reload, 
    //rest time added in code to run on login/register action reducer     
     store.dispatch(grabProductsFromStorage()); 
  },[]);




  return (
    <Provider store = {store}>
     
      <Router> 
        <div className="App">
          <Routes>
            <Route exact path="/" element= {<Landing/>}/>
            <Route exact path = "/products/:id" element = {<ProductDetails/>}/>
            <Route exact path = "/paymentconfirm" element = {<PaymentConfirm/>}/>
            {/*<ProtectedRoute exact path="/dashboard" component={Dashboard}/>*/}
            <Route exact path="/dashboard" 
            element={<ProtectedRoute component={() => 
                      (<Dashboard {...props} nestedRoute={Home}/>)}/>}/>

            <Route exact path="/dashboard/addProduct" 
            element={<ProtectedRoute component={() => 
                      (<Dashboard {...props} nestedRoute={AddProduct}/>)}/>}/>
            <Route exact path="/dashboard/products" 
            element={<ProtectedRoute component={() => 
                      (<Dashboard {...props} nestedRoute={Products}/>)}/>}/>   
            <Route exact path="/dashboard/addProfile" 
            element={<ProtectedRoute component={() => 
                      (<Dashboard {...props} nestedRoute={AddProfile}/>)}/>}/>
            <Route exact path="/dashboard/profile" 
            element={<ProtectedRoute component={() => 
                      (<Dashboard {...props} nestedRoute={Profile}/>)}/>}/>                                          
            <Route exact path="/register" element={<Register/>}/>
            <Route exact path="/login" element={<Login/>}/>
            <Route exact path="/cart" 
            element={<ProtectedRoute component={() => 
                      (<Cart {...props} />)}/>}/>   
          </Routes>
        </div>

      </Router>  
    </Provider>  
  );
}

export default App;

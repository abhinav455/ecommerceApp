//signin
import React, {useState, useEffect, useRef} from "react";
import Input from "../general/Input";
import {connect} from "react-redux";
import {useLocation, useNavigate, Link} from "react-router-dom"; //useParams
import { login } from "../../actions/authActions";
import {message} from "antd";


const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated, 
    errors : state.auth.errors,
}); 


const Login = connect(mapStateToProps, {login})((props) => {

    const initialState = {
        email:"",
        password:"",
    } 
    
    
    let location= useLocation(), navigate= useNavigate(); //, params= useParams();
    let [{email, password}, setState] = useState(initialState);

    function onChange(e) {  //rendered only once
        setState({ email, password, [e.target.name]: e.target.value});
    }
    
    
    function  onSubmit() {
        const User = {
            email,
            password,
        };     
        
        props.login(User);
    }


    const firstUpdate = useRef(true);
    useEffect( () => {
      if(firstUpdate.current){
          firstUpdate.current = false;
          return;
      }
      
      if(props.errors && props.errors.length > 0){
        props.errors.forEach(error => {
             message.error(error.msg);
        });
      }
  
      if(props.isAuthenticated) {
          //const split = location.search.split("redirect=");
          //const redirect = split[split.length-1].split("&")[0]
          const redirect = new URLSearchParams(location.search).get("redirect"); 
          const hasRedirect = redirect && location.search.includes("redirect"); 

          message.success("Thank you for logging in");
          setTimeout(()=> navigate(hasRedirect? redirect: "/"), 3000 );
      }
    }, [props.isAuthenticated, props.errors]); //[navigate], renders message 2 times



    return (
        <div className="container">
            <h1 className="large text-primary">Sign In</h1>
            <p className="lead"><i className="fas fa-user"></i>Sign Into Your Account</p>
            <div className="form">
                <Input
                    name="email"
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={onChange}
                /> 
                <Input
                    name="password"
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={onChange}
                />          
            </div> 
            <button className="btn btn-primary" onClick={onSubmit}>Sign In</button>
            <p className="my-1">Dont Have an account?
                <Link to={`/register${location.search}&&role=customer`}>Sign Up</Link> 
            </p>
        </div>
    
      );
});

export default Login;

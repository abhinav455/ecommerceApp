//signup
import React, {useState, useEffect, useRef} from "react";
import Input from "../general/Input";
import {connect} from "react-redux";
import {useLocation, useNavigate} from "react-router-dom"; //useParams
import { register } from "../../actions/authActions";
import {message} from "antd";

const mapStateToProps = (state) => ({
    auth: state.auth,
}); 


const Register = connect(mapStateToProps, {register})((props) => {

  
  const initialState = {
    name:"",
    email:"",
    password:"",
    password2:"",
  };  

  let location= useLocation(), navigate= useNavigate(); //, params= useParams();
  let [{name, email, password, password2}, setState] = useState(initialState);


   function onChange(e) {  //rendered only once
    setState({name, email, password, password2, [e.target.name]: e.target.value});
  }  


   function  onSubmit() {
    let role = new URLSearchParams(location.search).get('role');
    const newUser = {
        name, 
        email,
        password,
        role,
    }; 
    
    if(password === password2){
        props.register(newUser);
    }else{
        message.error("passwords dont match");
    }
  }


  const firstUpdate = useRef(true);
  useEffect( () => {
    if(firstUpdate.current){
        firstUpdate.current = false;
        return;
    }
    

    if(props.auth.errors && props.auth.errors.length > 0){
        props.auth.errors.forEach(error => {
             message.error(error.msg);
        });
    }

    if(props.auth.isAuthenticated) {
        const redirect = new URLSearchParams(location.search).get("redirect"); 
        const hasRedirect = redirect  && location.search.includes("redirect"); 

        message.success("Thank you for signing up");
        setTimeout(()=> navigate(hasRedirect? redirect: "/"), 3000 );
    }
  }, [props.auth, props.register]); //[navigate], renders message 2 times //will use old value of navigate but ok


  return (
    <div className="container">
        <h1 className="large text-primary">Register</h1>
        <p className="lead"><i className="fas fa-user"></i>Create Your Account</p>
        <div className="form">
            <Input
                name="name"
                type="text"
                placeholder="Enter Name"
                value={name}
                onChange={onChange}
            /> 
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
            <Input
                name="password2"
                type="password"
                placeholder="Confirm Password"
                value={password2}
                onChange={onChange}
            />          
        </div> 
        <button className="btn btn-primary" onClick={onSubmit}>Register</button>
    </div>

  );
});



export default Register;
//export default connect(mapStateToProps, {register}) (Register(props, location= useLocation(), navigate= useNavigate(), params= useParams()));  
         //withRouter(depreciated) just appends these location,navigate,params variables in the props 
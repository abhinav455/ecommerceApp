import React, {useEffect} from 'react';
import { Route, Redirect, Link } from 'react-router-dom';
import {connect} from "react-redux";
import {logout} from "../../actions/authActions";


const mapStateToProps = (state) => ({
  auth: state.auth,
}); 

const NavBar = connect(mapStateToProps, {logout})(({auth, logout}) => {

  const user = (
    <ul>
      <li>
        <Link to="/dashboard">Dashboard</Link>
      </li>
      <li>
        <Link to="/register?role=merchant">Become A Merchant</Link>
      </li>
      <li>
        <Link to="/cart">
        <i className='fas fa-cart-plus'></i>       
           Cart
        </Link>
      </li>
      <li>
        <Link onClick={logout} to="#!">
          <i className='fas fa-sign-out-alt'></i>
          <span className='hide-on-mobile'>Logout</span>
        </Link>
      </li>
    </ul>
  ); 

  const guest = (
    <ul>
      <li>
        <Link to="/register?role=merchant">Merchant</Link>
      </li>
      <li>
        <Link to="/register?role=customer">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  );

  return (
    <nav className = "main-navbar bg-main">  
      <h1>
        <Link to="/">
          <i className="fas fa-store"></i> e-Shop
        </Link>
      </h1>
      {auth.isAuthenticated? user : guest}
    </nav>
  );
});

export default NavBar;

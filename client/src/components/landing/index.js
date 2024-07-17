import React from 'react';
import NavBar from "../general/NavBar";
import Background from './Background';
import Products from './Products';

function index() {
  return (
    <div>
        <NavBar/>
        <Background/>
        <Products/>
    </div>
  )
};

export default index;
import React, {useState, useEffect, useRef} from 'react';
import {connect} from "react-redux";
import {getProducts} from "../../actions/productAction";
import Product from "../general/Product";


const mapStateToProps = (state) => ({
    products: state.products,
});

const Products = connect(mapStateToProps, {getProducts})((props) => {

  let [products, setProducts]  = useState([]);

  const firstUpdate = useRef(true);  
  useEffect(() => {  
    // if(firstUpdate.current){
    //     firstUpdate.current = false;
    //     return;
    // }
    
    //componentdidmount   
    props.getProducts();
  }, []);
 
         //component will receive props
  const firstUpdate2 = useRef(true);         
  useEffect(() => {  
    if(firstUpdate2.current){
        firstUpdate2.current = false;
        return;
    }

    if(props && props.products.products){
        const new_products = props.products.products;
        setProducts(new_products); 
        //changing local state thus this useEffect wont run infinite
         //local state needed, cant use props.products.products in render as this useEffect will run infinite
         //if want to use props.products.products in render, then dont need this extra useEffect just use directly
    }
  }, [props]);

  const productDetails = (product) =>{
    return (
        <ul>
            <li>${product.price}</li>
            <li>quantity:{product.quantity}</li>
        </ul>
    );
  }; 

 return (
    <div className="container-flex">
        <div className="row">
            {products.map((product, index) => {
                return (
                  <Product
                  key={index}
                  link={`products/${product._id}`}
                  product={product}
                  description={productDetails(product)}
                />
                );
            })}
        </div>
    </div>
  )
});

export default Products;
import React, {useState, useEffect, useRef} from 'react';
import { connect } from "react-redux";
import { getInstructorProducts } from "../../../actions/productAction";
import Product from "../../general/Product";
import { decodeUser } from "../../../util";


const mapStateToProps = (state) => ({
  products: state.products,
});

const Products = connect(mapStateToProps, {getInstructorProducts})((props) => {
  
    let [merchantProducts, setProducts]  = useState([]);

    let firstUpdate = useRef(true);  
    useEffect(() => {  
      if(firstUpdate.current){
          firstUpdate.current = false;
          return;
      }
      
      //componentdidmount   
      props.getInstructorProducts(decodeUser().user.id);
    }, []);


    //component will receive props
    let firstUpdate2 = useRef(true);         
    useEffect(() => {  
      if(firstUpdate2.current){
          firstUpdate2.current = false;
          return;
      }
  
      if (
        props &&
        props.products &&
        props.products.products.length > 0
      ) {
        const newmerchantProducts = props.products.products;
        setProducts(newmerchantProducts );
      }
    }, [props]);



  const productDetails = (product) => {
    return (
      <ul>
        <li>${product.price}</li>
        <li>quantity:{product.quantity}</li>
      </ul>
    );
  };


  return (
    <div className="row">
      {merchantProducts.map((product, index) => (
        <Product
          key={index}
          product={product}
          description={productDetails(product)}
         // uploadImages={`/dashboard/products/${product._id}/addImages`}
         // thumbnail={product.thumbnail}
         // showBtn={true}
        />
      ))}
    </div>
  );
  
});


export default Products;

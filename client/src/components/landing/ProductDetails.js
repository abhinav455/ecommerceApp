import React, {useState, useEffect, useRef, Fragment} from 'react';
import { useParams, Link } from 'react-router-dom';
import {connect} from "react-redux";
import {getProduct} from "../../actions/productAction";
import { addToCart } from '../../actions/cartActions';
import {Space, Spin, Button, Rate, Modal, Alert} from "antd";
import NavBar from '../general/NavBar';
import { isEmpty } from 'lodash';
import { decodeUser } from '../../util';


const mapStateToProps = (state) => ({
    product: state.products.product,
});

const ProductDetails = connect(mapStateToProps, {getProduct, addToCart})((props) => {
  
  let [product, setProduct]  = useState({});  
  let params = useParams(); 
  let [visible, setVisible] = useState(false);


  //componentdidmount 
  let firstUpdate = useRef(true);  
  useEffect(() => {  
    if(firstUpdate.current){
        firstUpdate.current = false;
        return;
    }
    const id = params.id;
    props.getProduct(id);
     
  }, []);

  //component will receive props
  let firstUpdate2 = useRef(0);        
  useEffect(() => {  
    if(firstUpdate2.current<2){
        firstUpdate2.current++;
        return;
    }

    if (props && props.product ) { 
      setProduct(props.product);
    }
  }, [props.product]);



  const showModal = () => {
    setVisible(true);
  };

  const handleOk = (e) => {
    setVisible(false);
  };

  const handleCancel = (e) => {
    setVisible(false);
  };


  const addProductToCart = async () => {
    //check id user is signed in(auth state
      // but that comes user state fetch using token of local storage header only)
    //if not use local storage, 
    //and when signin add the products to cartApi using actions and get back cart

    if(!localStorage.getItem("token") ){
      const productExists = !isEmpty(localStorage.getItem("products"));
      if(productExists){
        const products = JSON.parse(localStorage.getItem("products")); //stored as text
        products.push(product._id);
        showModal();
        return localStorage.setItem("products", JSON.stringify(Array.from(new Set(products))));
      }
      else{
        showModal();
        return localStorage.setItem("products", JSON.stringify([product._id]));
      }
    }

    //const userId = decodeUser().user._id;
    const context = {products: [product._id]};
    await props.addToCart(context);
    showModal();


  }




  const registerModal = (product) => {
    return (
      <Modal
        title = ""
        open={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer = {[
          <Button key="back" onClick={handleCancel}>
            Close
          </Button>,
        ]}
      >
        <div>
          <br/>
          <br/>
          <Alert  
            message={
              <center>
                <span>
                  <strong>Added</strong> {product.name} to Cart
                </span>
              </center>
            } 
            type="success"
          />
          <br/>
          <center>
            <Link to="/cart?redirect=/cart">
              <Button key="submit" type="primary">Go to Cart</Button>
            </Link>
          </center>
          <hr/>
        </div>
      </Modal>
    );
  }

  
  return (

    <Fragment>
    <NavBar/>
    <div className='container'>
        {product ? 
        (<Fragment>
        <div className="row" >
        <div className='col-lg-6 col-md-6 col-sm-6'>
            <img src="/assets/images/eshop.jpg" alt="product"/>
        </div>    
        <div className='col-lg-6 col-md-6 col-sm-6'>
            <h1 style={{margin: '0'}}>{product.name}</h1>
            <p className='lead' style={{margin: '0'}}>Description: {product.description}</p>
            <p className='lead' style={{margin: '0'}}>Features:</p>
            <ul style={{marginLeft: '5%', marginTop: "0"}}>
            {   product.features &&
                product.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                ))
            }
            </ul>   
            <Rate allowHalf disabled defaultValue={product.rating} style={{margin: '0'}}/>
            <p className='lead' style={{margin: '0'}}>Quantity: {product.quantity}</p>
            <h1>${product.price}</h1>
            <Button type="primary" onClick={addProductToCart}>Add to Cart</Button> 
        </div>              
        </div> 
        <br/>
        <hr/>
        <br/>
        <h1>Product Details</h1>
          <p className='lead'><b>{product.details}</b></p>
          <p className='lead' style={{margin: '0'}}>
            Main Features of Product:
          </p>
            <ul style={{marginLeft: '5%', marginTop: "0"}}>
            {   product.features &&
                product.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                ))
            }
            </ul>  
        </Fragment>
        ) : (
           <Space size="middle">
             <Spin size="large"/>
           </Space>
        )}
    </div>
    {product && registerModal(product)}
    </Fragment>
  )
});

export default ProductDetails;
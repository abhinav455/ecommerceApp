import React, { useState, useEffect, useRef, Fragment } from "react";
import { connect } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { isEmpty } from "lodash";
import { getCart, removeFromCart } from "../../actions/cartActions";
import { getProduct } from "../../actions/productAction";
import { Empty, Button, List , Avatar, Skeleton} from "antd";
import NavBar from "../general/NavBar";
import Payment from "./Payment";

const mapStateToProps = (state) => ({
  cart: state.cart.cart,
});

const Cart = connect(mapStateToProps, { getCart, removeFromCart })((props) => {
  let [cart, setCart] = useState({});

  //getCart componentdidmount
  let firstUpdate = useRef(true);
  useEffect(() => {
    // if (firstUpdate.current) {
    //   firstUpdate.current = false;
    //   return;
    // }

    props.getCart();
  }, []);

  //component will receive props
  let firstUpdate2 = useRef(0);
  useEffect(() => {
    if (firstUpdate2.current < 1) { //2
      firstUpdate2.current++;
      return;
    }

    if (props && props.cart) {
      setCart(props.cart);
    }
  }, [props.cart]);



  const calculateTotal = () => {
     let total = 0;
     if(cart.products && cart.products.length > 0){
        const cartProducts = cart.products;
        cartProducts.forEach(product => {
            total+= product.price;
        });  
     }

     return total;
  }

  const removeProduct = (product) => {
    const context = {id: cart._id, product: product._id};
    props.removeFromCart(context);
    //window.location.reload();
  }




  return (
    <Fragment>
    <NavBar/>
    <div className="container" style={{textAlign: "center"}}>
      {isEmpty(cart.products) ? (
        <div className="empty-cart-border">
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="Your Cart is Empty. Keep Shopping"
            imageStyle={{ height: 60 }}
          >
            <Link to="/">
              <Button type="primary">Keep Shopping</Button>
            </Link>
          </Empty>
        </div>
      ) : (
        <div className="row">
        <div className="col-sm-8 col-md-8 col-lg-8">
          <List
            className="demo-loadmore-list"
            itemLayout="horizontal"
            dataSource={cart.products || []}
            renderItem={(item) => (
              <List.Item
                actions={[
                  <Link
                    to="#"
                    key="list-loadmore-edit"
                    onClick={(_) => removeProduct(item)}
                  >
                    Remove from cart
                  </Link>,
                ]}
              >
                <Skeleton
                  avatar
                  title={false}
                  loading={item.loading}
                  active
                >
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        shape="square"
                        size={100}
                        src={item.thumbnail}
                      />
                    }
                    title={item.name}
                    description={item.description}
                  />
                  <div>
                    <b>{`$ ${item.price}`}</b>
                  </div>
                </Skeleton>
              </List.Item>
            )}
          />
        </div>
        <div className="col-sm-4 col-md-4 col-lg-4">
          <br />
          <br />
          <h4>{`Total: $ ${calculateTotal()}`}</h4>
          <Payment cart={cart} total={calculateTotal()} /> 
        </div>
        <div style={{ textAlign: "center" }}>
          {cart.products && (
            <Link to="/" className="btn btn-primary">
              Keep Shopping
            </Link>
          )}
        </div> 
      </div>
      )}
    </div>
    </Fragment>
  );
});

export default Cart;

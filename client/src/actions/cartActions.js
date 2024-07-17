import axios from "axios";
import {GET_CART, ERRORS} from "./types";
import {getServer, decodeUser} from "../util";
import setAuthToken from "../util/setAuthToken";



export const grabProductsFromStorage = () => dispatch => {
    if(localStorage.token){
        setAuthToken(localStorage.token); 
     }  //as other dispatch are run in parallel in async thus it may not be set

    if(localStorage.getItem("token") && localStorage.getItem("products")){   
        const cartProducts = JSON.parse(localStorage.getItem("products"));
        const context = {products: cartProducts};
        dispatch(addToCart(context));
        localStorage.removeItem("products");
    } 
}




export const addToCart = (context) => async (dispatch) => { //context = {products: [list of ids]}
    const config = {
        headers:{
            "Content-Type": "application/json",          
        },     
    };

    try{
        const res =await axios.post(`${getServer()}/api/cart`, context, config);
        dispatch({
            type: GET_CART,
            payload: res.data,
        });
    } catch(err){
        dispatch({
            type: ERRORS,
            payload: err,
        })
    }

}



export const getCart = () => async (dispatch) => {
    try{
        const res =await axios.get(`${getServer()}/api/cart`);
        dispatch({
            type: GET_CART,
            payload: res.data,
        });
    } catch(err){
        dispatch({
            type: ERRORS,
            payload: err,
        })
    }
}



export const removeFromCart = (context) => async (dispatch) => { //context = {products: [list of ids], id: cart._id}
    const config = {
        headers:{
            "Content-Type": "application/json",          
        },     
    };

    try{
        const {id} = context;
        const res =await axios.put(`${getServer()}/api/cart/${id}`, context, config);
        dispatch({
            type: GET_CART,
            payload: res.data,
        });
    } catch(err){
        dispatch({
            type: ERRORS,
            payload: err,
        })
    }

}
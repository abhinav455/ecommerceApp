import axios from "axios";
import  { 
    SET_CURRENT_USER, 
    SUCCESSFUL_REGISTER,
    FAILURE_REGISTER,
    AUTH_ERRORS,
    AUTH_ERROR,
    SUCCESSFUL_LOGIN,
    FAILURE_LOGIN,
    LOGOUT,
} from "./types";
import {getServer} from "../util";
import setAuthToken from "../util/setAuthToken";
import { grabProductsFromStorage } from "./cartActions";



//set a user in frontend state, get user from backend from userid in token
export const setCurrentUser = () => async dispatch => {
    if(localStorage.token){
       setAuthToken(localStorage.token); //pick from localstorage and set axios header 
    }

    try{
        const res = await axios.get(`${getServer()}/api/auth`); //get user from server, needs token, user details in token
        dispatch({
            type: SET_CURRENT_USER,
            payload: res.data,
        });
    } catch(error){
        dispatch({
            type: AUTH_ERROR,
        });
    }
};






//register/signup a user in backend, set token in frontend and in state
       //with thunk return fns instead of action objects
export const register = (userData) => async dispatch => {
    const config = {
        headers: {
            "Content-type": "application/json",
        }
    };

    try{
        const res = await axios.post(`${getServer()}/api/users`, userData, config);  //signup, get back  token
        dispatch({
            type: SUCCESSFUL_REGISTER,
            payload: res.data,            //set token in local storage in reducer
        });
        dispatch(setCurrentUser());
        dispatch(grabProductsFromStorage());
    } catch(err){
        if(err.response && err.response.data.errors ){ //client error
            const error = err.response.data.errors;  
            dispatch({
                type: AUTH_ERRORS,
                payload: error,
            });
        }else{     //server error
            dispatch({
                type: FAILURE_REGISTER,
            });
        }

    }
}



//signin user in backend, set token in frontend and in state
export const login = (userData) => async dispatch => {
    const config = {
        headers: {
            "Content-type": "application/json",
        }
    };

    try{
        const res = await axios.post(`${getServer()}/api/auth`, userData, config);  //signup, get back  token
        dispatch({
            type: SUCCESSFUL_LOGIN,
            payload: res.data,            //set token in local storage in reducer
        });
        dispatch(setCurrentUser());
        dispatch(grabProductsFromStorage());
    } catch(err){  
        if(err.response && err.response.data.errors ){ //client error
            const error = err.response.data.errors;  
            dispatch({
                type: AUTH_ERRORS,
                payload: error,
            });
        }else{     //server error
            dispatch({
                type: FAILURE_LOGIN,
            });
        }
    }

}


export const logout = () => async (dispatch) => dispatch({type: LOGOUT});
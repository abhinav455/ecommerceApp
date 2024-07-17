import axios from "axios";
import {GET_PROFILE, PROFILE_ERROR, ERRORS} from "./types";
import {getServer} from "../util";


export const getProfile = (id) => async dispatch =>{
  try{
      const res = await axios.get(`${getServer()}/api/profile/${id}`);
      dispatch({
          type: GET_PROFILE,
          payload: res.data,
      })
  } catch(err){
      if(err.response.status === 400)
        dispatch({   //no profile redirect to add profile page
          type: GET_PROFILE,
          payload: null,
      })
      else dispatch({
          type: PROFILE_ERROR,
          payload: {status: err.response },
      })
  }
};


export const createProfile = (profileData, navigate) => async dispatch => {
  const config = {
      headers:{
          "Content-Type": "application/json",          
      },     
  };
  try{
      const res = await axios.post(`${getServer()}/api/profile`, profileData, config);
      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      });
      navigate("/dashboard/profile");

  } catch(err){
      if(err.response && err.response.data.errors ){ //client error
        const error = err.response.data.errors;  
        dispatch({
            type: ERRORS,
            payload: error,
        });
    }else{     //server error
        dispatch({
            type: PROFILE_ERROR,
            payload: {status: err.response },
        });
    }
  }
};


export const deleteAccount = (navigate) => async dispatch => {
  try{
    await axios.delete(`${getServer()}/api/profile`);
    localStorage.removeItem("token");
    navigate("/");  //go to that route
    window.location.reload(); 
      //reload the current page, so that all the states become gone
      //or instead dispatch reducer and in that set the auth state, 
           //isAuthenticated = false, user = null
} catch(err){
    dispatch({
        type: PROFILE_ERROR,
        payload: {status: err.response },
    })
}
}
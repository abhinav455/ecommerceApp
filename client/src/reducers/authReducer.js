import {
  SET_CURRENT_USER,
  AUTH_ERROR,
  SUCCESSFUL_REGISTER,
  AUTH_ERRORS,
  FAILURE_REGISTER,
  SUCCESSFUL_LOGIN,
  FAILURE_LOGIN, 
  LOGOUT,
} from "../actions/types";
//import { isEmpty } from "lodash";

const initialState = {
  isAuthenticated: localStorage.getItem("token")? true: false,
  token: localStorage.getItem("token"),
  user: {},
  errors: [],
};

export default function authReducer(state = initialState, action) {
  const { payload } = action;
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: true,
        user: payload,
      };
    case SUCCESSFUL_REGISTER:
    case SUCCESSFUL_LOGIN:    
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
      };  
    case AUTH_ERRORS:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        user: null,
        errors: payload,
      };
    case AUTH_ERROR:
    case FAILURE_REGISTER:
    case FAILURE_LOGIN: 
    case LOGOUT:   
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        user: null,
      }; 
    default:
      return state;
  }
}

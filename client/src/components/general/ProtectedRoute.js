import React from "react";
import {connect} from "react-redux";
import { useLocation,  Navigate} from "react-router-dom";

const mapStateToProps = (state) => ({
    auth: state.auth,
});

const ProtectedRoute = connect(mapStateToProps)(({component: Component, auth, ...rest}) => {
                                                              //accumulate other props in rest
  
  let location = useLocation();                                                         
  return ( 
    //<Route {...rest}
    //    element= {(props) =>                     //spread/destructure other props from rest 
            auth.isAuthenticated? <Component {...rest} /*{ ...{...rest, auth}}*/ /> : <Navigate to={`/login${location.search}`}/>
                //no point in passing auth like this as in Child component also getting auth state from redux store connect
    //    } 
    ///>     
  );               //exact path goes in ...rest
});

export default ProtectedRoute;

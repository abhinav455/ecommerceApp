import axios from "axios";
import {jwtDecode} from "jwt-decode";

const isDevelopment = window.location.hostname.includes("localhost");

const getServer = ()=> {        //node-express server axios calls
    return isDevelopment ? "http://localhost:5000" : "http://10.160.68.155:5000"; 
                //it will call this to get backend server using axios in react either with 
                  //1)my private ip as this on vedant browser url(if not react, console fetch uses vedant private ip) 

};

const getClientServer = ()=> {  //stripe client redirect url
    return isDevelopment ? "http://localhost:3000" : "http://10.160.68.155:3000";
};

const decodeUser = () => {
    const token = localStorage.getItem("token");
    return jwtDecode(token);
}

export {getServer, getClientServer, decodeUser};
import { AuthContext } from "./helpers/AuthContext";
import { ColorContext } from "./helpers/ColorContext";

import React, { useContext } from "react";

import axios from 'axios';
import { useEffect } from "react";


import { useRef } from "react";
axios.defaults.withCredentials = true;


const Home = () =>{
    const [colorState,setColorState]= useContext(ColorContext);
    const [authState,setAuthState] = useContext(AuthContext);


    return(
    <div className="mx-40 font-roboto flex justify-center">
        <div className={`py-32 text-4xl font-bold ${colorState.textcolor2}`}> Welcome To Tensor Insight Training System</div>
   
    </div>
    );
    
    };
    
    export default Home;
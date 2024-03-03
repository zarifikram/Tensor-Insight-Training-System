import { AuthContext } from "./helpers/AuthContext";
import { ColorContext } from "./helpers/ColorContext";
import { EnvVariableContext } from "./helpers/EnvVariableContext";

import React, { useContext } from "react";

import axios from 'axios';
import { useEffect } from "react";


import { useRef } from "react";
axios.defaults.withCredentials = true;


const Home = () =>{
    const [colorState,setColorState]= useContext(ColorContext);
    const [authState,setAuthState] = useContext(AuthContext);
    const [envVariables,setEnvVariables] = useContext(EnvVariableContext);


    return(
    <div className="mx-40 font-roboto ">
        <div className={`pt-40 text-4xl font-bold ${colorState.textcolor2}`}> Welcome to Tensor Insight Training System</div>
        <div className={`py-2 text-md font-bold ${colorState.textcolor}`}> tensor practice and contest application</div>
    </div>
    );
    
    };
    
    export default Home;
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
    <div className="mx-40 font-roboto ">
        <div className={`pt-40 text-4xl font-bold ${colorState.textcolor2}`}> Something Catchy</div>
        <div className={`py-2 text-md font-bold ${colorState.textcolor}`}> something catchy but in a smaller font with a fullstop.</div>
    </div>
    );
    
    };
    
    export default Home;
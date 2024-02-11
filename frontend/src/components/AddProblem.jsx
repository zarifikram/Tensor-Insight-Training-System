import { AuthContext } from "./helpers/AuthContext";
import { ColorContext } from "./helpers/ColorContext";
import React, { useContext } from "react";
import { useState } from "react";

import axios from 'axios';
import { useEffect } from "react";
import Cookies from 'js-cookie';
import { useRef } from "react";

const AddProblem = () =>{

    const [colorState,setColorState]= useContext(ColorContext);
    const [authState,setAuthState] = useContext(AuthContext);
    const codeRef = useRef();

    return(
    <div className="mx-40">
add problem
    </div>
    );
    
    };
    
    export default AddProblem;
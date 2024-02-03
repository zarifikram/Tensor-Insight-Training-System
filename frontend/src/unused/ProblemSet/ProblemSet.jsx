import { AuthContext } from "../helpers/AuthContext";
import { ColorContext } from "../helpers/ColorContext";
import React, { useContext } from "react";
import { useState } from "react";

import Problem from "./Problem";
import axios from 'axios';
import { useEffect } from "react";

import { useRef } from "react";

const CustomMode = () =>{
    const [colorState,setColorState]= useContext(ColorContext);
    const [authState,setAuthState] = useContext(AuthContext);
   
    //Popup--------------------------------------------
    const [isPopupOpen, setPopupOpen] = useState(true);
    
    const openPopup = (page) => { 
        setPopupOpen(true);
        
    };
    
    const closePopup = () => {
        setPopupOpen(false);
    };

    return(
    <div className="mx-40">
        <div>
      
        </div>
        {
            <Problem isOpen={isPopupOpen} onClose={closePopup} />
        }
    </div>
    );
    
    };
    
    export default CustomMode;
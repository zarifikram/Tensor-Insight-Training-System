import { AuthContext } from "../components/helpers/AuthContext";
import { ColorContext } from "../components/helpers/ColorContext";
import React, { useContext } from "react";
import { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";

import Problem from "../components/ProblemSet/Problem";
import axios from 'axios';
import { useEffect } from "react";

axios.defaults.withCredentials= true;

import { useRef } from "react";

const Discussion = ({  isOpen,onClose,children }) =>{

    useEffect(() => {
        //set axios csrf header
        axios.defaults.headers.common['X-CSRFToken'] = Cookies.get('csrf');
    }, []);

    const [colorState,setColorState]= useContext(ColorContext);
    const [authState,setAuthState] = useContext(AuthContext);
    const handleClose = (e) => {
        // Close the popup only if the overlay is clicked
       
            if (e.target.classList.contains('overlay')) {
                onClose();
            }
        };
   

    return(
        <>
        <div
          className={`fixed inset-0 overflow-y-auto transition-opacity duration-300 
          ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          onClick={handleClose} // Added onClick event for the entire popup
          >
          <div className="flex items-center justify-center min-h-screen">
            <div className="overlay fixed inset-0 bg-black opacity-50"></div>
            <div className={` z-40 ${colorState.bgcolor} ${colorState.textcolor} p-4 max-w-screen-lg w-85% mx-auto rounded-md shadow-md transition-transform  transform duration-300 `} >
              <div>

  
              <div className={`mx-5 `}>
                <div className={`text-2xl ${colorState.captioncolor} font-bold pb-5`}>Problem Set</div>

                        sdfdsf
 
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
    
    };
    
    export default Discussion;
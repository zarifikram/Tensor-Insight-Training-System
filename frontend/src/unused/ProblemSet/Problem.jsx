// Popup.js
import { AuthContext } from "../helpers/AuthContext";
import { ColorContext } from "../helpers/ColorContext";
import react,{ useContext } from "react";

import { useState } from "react";

const Problem = ({ isOpen, onClose,children }) => {
    const [colorState,setColorState]= useContext(ColorContext);

    const handleClose = (e) => {
    // Close the popup only if the overlay is clicked
        if (e.target.classList.contains('overlay')) {
            onClose();
        }
    };


    return (
    <>
      <div
        className={`fixed inset-0 overflow-y-auto transition-opacity duration-300 
        ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={handleClose} // Added onClick event for the entire popup
        >
        <div className="flex items-center justify-center min-h-screen">
          <div className="overlay fixed inset-0 bg-black opacity-50"></div>
          <div className={` z-40 ${colorState.bgcolor} ${colorState.textcolor} p-4 max-w-screen-lg w-50% mx-auto rounded-md shadow-md transition-transform  transform duration-300 `} >
            <div>


            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Problem;

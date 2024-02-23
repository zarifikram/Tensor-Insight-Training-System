// Popup.js
import { AuthContext } from "../helpers/AuthContext";
import { ColorContext } from "../helpers/ColorContext";
import react,{ useContext } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";//<RxCross2/>
import { IoMdCheckmark } from "react-icons/io";//<IoMdCheckmark />
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosCloseCircle } from "react-icons/io";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { useEffect } from "react";
import axios from 'axios';

import { useState } from "react";

axios.defaults.withCredentials= true;

const QuantitySelectionPopUp = ({ isOpen, onClose, quantity,setQuantity,mode, setMode, children }) => {
    const [colorState,setColorState]= useContext(ColorContext);
    
    const [authState,setAuthState] = useContext(AuthContext);

    const handleQuantityChange = (event) => {
        // Parse the input value as an integer
        const newQuantity = parseInt(event.target.value, 10);
        // Update the quantity state
        setMode(prevState => ({
          ...prevState,
          setting:newQuantity
        }));
        setQuantity(newQuantity);
      };

    const initializeQuantityMode = () =>{
      
      axios.post("http://127.0.0.1:8000/api/quantity-mode/create/",{number_of_problems:quantity.toString()})
      .then((response) => {
        console.log(response.data);
        console.log("okay----")
        setAuthState(prevState => ({
          ...prevState,
          QuantityModeRunning:1
        }));
        onClose();
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    }
  
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
          <div className={` z-40 ${colorState.bgcolor} ${colorState.textcolor} p-9 max-w-screen-lg w-25% mx-auto rounded-md shadow-md transition-transform  transform duration-300 `} >
            <div className={`text-2xl font-bold`}>
                Set Quantity
            </div>
            <div className={`mt-4`}>
            </div>
            <input type="number" className={`${colorState.box1color} h-9 rounded-md mt-5 flex justify-center items-center w-full text-center font-bold `}
            value={quantity}
            onChange={handleQuantityChange}
            />
            <div className={`mt-2`}>
            Choose the number puzzles to include in the set.
            </div>
            <div className={`${colorState.box1color} h-9 rounded-md mt-5 flex justify-center items-center hover:bg-gray-400`} onClick={initializeQuantityMode}>
            ok, let’s start
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuantitySelectionPopUp;

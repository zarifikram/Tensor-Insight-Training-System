import { AuthContext } from "./helpers/AuthContext";
import { ColorContext } from "./helpers/ColorContext";
import React, { useContext } from "react";
import { useState } from "react";

import CodePane from "./CodePane";
import { RxCross2 } from "react-icons/rx";//<RxCross2/>
import { IoMdCheckmark } from "react-icons/io";//<IoMdCheckmark />
import axios from 'axios';

import QuantityModePopUp from "./QuantityModePopUp";

const QuantityMode = () =>{
    const [colorState,setColorState]= useContext(ColorContext);

    let m1="[[1, 2, 3]], [4, 1, 2], [2, 1, 5]]";
    let m2="[[1], [1], [5]]";
    let m3="[[1, 2, 3]], [4, 1, 2], [2, 1, 5]]";

    //Popup--------------------------------------------

    const [isPopupOpen, setPopupOpen] = useState(false);
    const [currentPage,setCurrentPage] = useState(0);

    const openPopup = (page) => {
        console.log("pop");
        setPopupOpen(true);
        setCurrentPage(page);
    };
    
    const closePopup = () => {
        setPopupOpen(false);
    };

    const function1 = () => {
        axios.get("http://127.0.0.1:8000/api/time-mode/")
            .then((response) => {
            console.log(response.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
        console.log("tt");
    };
    //-------------------------------------------------

    return(
    <div className="mx-40">
        <div className=" h-24 flex justify-center py-4 items-center">
            <div className={` ${colorState.box1color}  w-40% rounded-full font-bold text-2xl flex justify-evenly py-5 text-gray-700`}>
                <div className={`bg-green-600 rounded-full`}  onClick={()=>openPopup(0)}><IoMdCheckmark/></div>
                <div className={`bg-red-600 rounded-full `} onClick={()=>openPopup(1)}><RxCross2/></div>
                <div className={`bg-green-600 rounded-full`} onClick={()=>openPopup(2)}><IoMdCheckmark/></div>
                <div className={`bg-green-600 rounded-full`} onClick={()=>openPopup(3)}><IoMdCheckmark/></div>
                <div className={`bg-red-600 rounded-full`} onClick={()=>openPopup(4)}><RxCross2/></div>
            </div>
            <button onClick={function1}>aaa</button>
        </div>
        <CodePane/>
        {
            <QuantityModePopUp isOpen={isPopupOpen} onClose={closePopup} currentPage={currentPage} setCurrentPage={setCurrentPage} />
        }
    </div>
    );
    
    };
    
    export default QuantityMode;
import { AuthContext } from "./helpers/AuthContext";
import { ColorContext } from "./helpers/ColorContext";
import React, { useContext } from "react";
import { useState } from "react";

import CodePane from "./CodePane";
import { RxCross2 } from "react-icons/rx";//<RxCross2/>
import { IoMdCheckmark } from "react-icons/io";//<IoMdCheckmark />

import TimeModePopUp from "./TimeModePopUp";
import TimeSelectionPopUp from "./TimeSelectionPopUp";


const TimeMode = () =>{
    const [colorState,setColorState]= useContext(ColorContext);
    const [authState,setAuthState] = useContext(AuthContext);
  
    //Popup--------------------------------------------
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [isTimeSelecetionPopupOpen, setTimeSelecetionPopupOpen] = useState(true);
    const [currentPage,setCurrentPage] = useState(0);

    const openPopup = (page) => {
        console.log("pop");
        setPopupOpen(true);
        setCurrentPage(page);
    };
    
    const closePopup = () => {
        setPopupOpen(false);
    };

    const openTimeSelectionPopup = () => {
        console.log("pop");
        setTimeSelecetionPopupOpen(true);
    };
    
    const closeTimeSelectionPopup = () => {
        setTimeSelecetionPopupOpen(false);
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
            time mode
        </div>
        <CodePane/>
        {
            <TimeModePopUp isOpen={isPopupOpen} onClose={closePopup} currentPage={currentPage} setCurrentPage={setCurrentPage} />
        }
                {
            <TimeSelectionPopUp isOpen={isTimeSelecetionPopupOpen} onClose={closeTimeSelectionPopup}  />
        }
    </div>
    );
    
    };
    
    export default TimeMode;
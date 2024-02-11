import { AiOutlineGlobal,AiOutlineSliders } from "react-icons/ai";
import { FaCode } from "react-icons/fa6";
import { FaCircleExclamation } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { IoTimeSharp } from "react-icons/io5";
import { FaBoltLightning } from "react-icons/fa6";
import { IoMdSettings } from "react-icons/io";
import { HiDotsHorizontal } from "react-icons/hi";//<HiDotsHorizontal />


import { AuthContext } from "./helpers/AuthContext";
import { ColorContext } from "./helpers/ColorContext";
import ProblemSet from "./ProblemSet/ProblemSet";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { useState } from "react";

import SettingsPopUp from "./Settings";
import { Link } from "react-router-dom";
const Navbar = () =>{
    const navigate = useNavigate();
    const [colorState,setColorState]= useContext(ColorContext);
    //console.log("from navbar")
    //console.log(colorState)
    const [mode,setMode] = useState("none");
    //Popup--------------------------------------------
  
    const [isPopupOpen, setPopupOpen] = useState(false);
 
    const openPopup = () => {
      setPopupOpen(true);
    };
  
    const closePopup = () => {
        console.log("close")
      setPopupOpen(false);
    };
    //-------------------------------------------------

    const [isPopupOpen2, setPopupOpen2] = useState(false);
    
    const openPopup2 = (page) => { 
        setMode("none");
        setPopupOpen2(true);
        
    };
    
    const closePopup2 = () => {
        setPopupOpen2(false);
    };



    return(
    <div className="w-screenwidth h-28 flex mx-40 py-10">
        
        <div className={`w-10% flex items-center font-saira text-3xl font-black ${colorState.captioncolor}`}>TensorITS</div>
        <div className={`w-15% flex justify-evenly`}>
            <div className={`  flex items-center justify-center py-2 font-saira ${colorState.textcolor} font-bold text-xl`} onClick={openPopup2}><FaCode /></div>
            <div className={`  flex items-center justify-center py-2 font-saira ${colorState.textcolor} font-bold text-xl`} onClick={() => navigate('/')}><AiOutlineGlobal/></div>
            <div className={`  flex items-center justify-center py-2 font-saira ${colorState.textcolor} font-bold text-xl`} onClick={() =>navigate('AddProblem')}><FaCircleExclamation /></div>
            <div className={`  flex items-center justify-center py-2 font-saira ${colorState.textcolor} font-bold text-xl`}>
                {<button onClick={openPopup} className={`hover:text-gray-400`}><IoMdSettings /></button>}
            </div>
        </div>
        <div className="w-65% flex align-middle justify-end items-center">
            <div  className={`w-65% ${colorState.box1color}  rounded-md flex justify-evenly py-1 font-saira ${colorState.textcolor} font-thin text-lg`}>
                <div className="flex w-65% justify-around mx-2.5">
                    <Link className={`${mode === "custom" ?`flex  items-center justify-center ${colorState.textcolor2}`:`flex  items-center justify-center`}`} to="/CustomMode" onClick={() => setMode("custom")}>
                    <AiOutlineSliders  className="flex items-center mr-1" /><div>custom</div>
                    </Link>
                    <Link className={`${mode === "time" ?`flex  items-center justify-center ${colorState.textcolor2}`:`flex  items-center justify-center`}`} to="/TimeMode" onClick={() => setMode("time")}>
                    <IoTimeSharp className="flex items-center mr-1" /><div>time</div>
                    </Link>
                    <Link className={`${mode === "quantity" ?`flex  items-center justify-center ${colorState.textcolor2}`:`flex  items-center justify-center`}`} to="/QuantityMode" onClick={() => setMode("quantity")}>
                    <FaBoltLightning className="flex items-center mr-1" /><div>quantity</div>
                    </Link>
                </div>
                <div className={`w-1.5 ${colorState.bgcolor} rounded`}></div>
                <div className="w-30% flex justify-evenly items-center">
                    <div>2</div>
                    <div>4</div>
                    <div>8</div>
                    <div>16</div>
                    <HiDotsHorizontal />
                </div>
            </div>
        </div>
        <div className={`w-5%`}></div>
        <Link className={`w-5%  flex justify-center items-center font-saira ${colorState.textcolor} font-bold text-2xl`} to="/Authentication"   onClick={() => {setMode("none");}}><FaUser/></Link>
        {
            <SettingsPopUp isOpen={isPopupOpen} onClose={closePopup}/>
        }
        {
           <ProblemSet isOpen ={isPopupOpen2} onClose={closePopup2}/>
        }
        
    </div>
    );
    
    };
    
    export default Navbar;
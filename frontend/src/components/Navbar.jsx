import { AiOutlineGlobal,AiOutlineSliders } from "react-icons/ai";
import { FaCode } from "react-icons/fa6";
import { FaCircleExclamation } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { IoTimeSharp } from "react-icons/io5";
import { FaBoltLightning } from "react-icons/fa6";
import { IoMdSettings } from "react-icons/io";
import { HiDotsHorizontal } from "react-icons/hi";//<HiDotsHorizontal />

import { AuthContext } from "./helpers/AuthContext";
import React, { useContext } from "react";

import { useState } from "react";

import SettingsPopUp from "./Settings";
const Navbar = () =>{
    const [authState,setAuthState]= useContext(AuthContext);
    console.log("from navbar")
    console.log(authState)

    //Popup--------------------------------------------
  
    const [isPopupOpen, setPopupOpen] = useState(false);
 
    const openPopup = () => {
      setPopupOpen(true);
    };
  
    const closePopup = () => {
      setPopupOpen(false);
    };
    //-------------------------------------------------

    return(
    <div className="w-screenwidth h-28 flex mx-40 py-10">
        <div className={`w-10% flex items-center font-saira text-3xl font-black ${authState.captioncolor}`}>TensorITS</div>
        <div className={`w-15% flex justify-evenly`}>
            <div className={`  flex items-center justify-center py-2 font-saira ${authState.textcolor} font-bold text-xl`}><FaCode /></div>
            <div className={`  flex items-center justify-center py-2 font-saira ${authState.textcolor} font-bold text-xl`}><AiOutlineGlobal/></div>
            <div className={`  flex items-center justify-center py-2 font-saira ${authState.textcolor} font-bold text-xl`}><FaCircleExclamation /></div>
            <div className={`  flex items-center justify-center py-2 font-saira ${authState.textcolor} font-bold text-xl`}>
                {<button onClick={openPopup} className={`hover:text-gray-400`}><IoMdSettings /></button>}
            </div>
        </div>
        <div className="w-65% flex align-middle justify-end items-center">
            <div  className={`w-65% ${authState.box1color}  rounded-md flex justify-evenly py-1 font-saira ${authState.textcolor} font-thin text-lg`}>
                <div className="flex w-65% justify-around mx-2.5">
                    <div className={`flex items-center justify-center`}>
                    <AiOutlineSliders  className="flex items-center mr-1" /><div>custom</div>
                    </div>
                    <div className={`flex items-center justify-center`}>
                    <IoTimeSharp className="flex items-center mr-1" /><div>time</div>
                    </div>
                    <div className={`flex  items-center justify-center ${authState.textcolor2}`}>
                    <FaBoltLightning className="flex items-center mr-1" /><div>quantity</div>
                    </div>
                </div>
                <div className={`w-1.5 ${authState.bgcolor} rounded`}></div>
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
        <div className={`w-5%  flex justify-center items-center font-saira ${authState.textcolor} font-bold text-2xl`}><FaUser/></div>
        {
            <SettingsPopUp isOpen={isPopupOpen} onClose={closePopup}/>
        }
        
    </div>
    );
    
    };
    
    export default Navbar;
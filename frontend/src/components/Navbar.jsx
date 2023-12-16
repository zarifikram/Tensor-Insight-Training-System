import { AiOutlineGlobal,AiOutlineSliders } from "react-icons/ai";
import { FaCode } from "react-icons/fa6";
import { FaCircleExclamation } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";

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
    <div className="w-screenwidth h-32 flex mx-40 py-10">
        <div className={`w-15%  font-saira text-5xl font-bold ${authState.captioncolor}`}>TensorITS</div>
        <div className={`w-5%  flex justify-center py-2 font-saira ${authState.textcolor} font-bold text-3xl`}><FaCode /></div>
        <div className={`w-5%  flex justify-center py-2 font-saira ${authState.textcolor} font-bold text-3xl`}><AiOutlineGlobal/></div>
        <div className={`w-5%  flex justify-center py-2 font-saira ${authState.textcolor} font-bold text-3xl`}><FaCircleExclamation /></div>
        <div className="w-65% flex align-middle justify-end">
            <div  className={`w-60% ${authState.box1color}  rounded-md flex justify-around py-2 font-saira ${authState.textcolor2} font-bold text-2xl`}>
                {
                    <button onClick={openPopup} className={`hover:text-gray-400`}>
                    <AiOutlineSliders  className="my-1"/>
                    </button>
                }
                Options
            </div>
        </div>
        <div className={`w-5%  flex justify-center py-2 font-saira ${authState.textcolor} font-bold text-3xl`}><FaUser /></div>
        {
            <SettingsPopUp isOpen={isPopupOpen} onClose={closePopup}/>
        }
        
    </div>
    );
    
    };
    
    export default Navbar;
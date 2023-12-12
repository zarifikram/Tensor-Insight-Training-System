import { IoColorPalette } from "react-icons/io5";

import { AuthContext } from "./helpers/AuthContext";
import react,{ useContext } from "react";

import ColorPickerPopup from "./ColorProfilePickerPopUp";
import { useState } from "react";

const Footer = () =>{

    const [authState,setAuthState] = useContext(AuthContext);
    //Popup--------------------------------------------
    const [isPopupOpen, setPopupOpen] = useState(false);

    const openPopup = () => {
        setPopupOpen(true);
    };
    
    const closePopup = () => {
        setPopupOpen(false);
    };

    //-------------------------------------------------
return (
<div className=" h-16 flex  mt-auto mx-40 justify-end">
    <div className={`w-16 flex justify-center items-center font-bold text-3xl ${authState.textcolor} hover:text-gray-400`} onClick={openPopup} >
        <IoColorPalette />
    </div>
    {
        <ColorPickerPopup isOpen={isPopupOpen} onClose={closePopup}/>
    }
</div>
);
};

export default Footer;
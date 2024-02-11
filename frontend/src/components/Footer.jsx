import { IoColorPalette } from "react-icons/io5";

import { AuthContext } from "./helpers/AuthContext";
import react,{ useContext } from "react";
import { ColorContext } from "./helpers/ColorContext";

import ColorPickerPopup from "./ColorProfilePickerPopUp";
import { useState } from "react";

const Footer = () =>{

    const [colorState,setColorState] = useContext(ColorContext);
    //Popup--------------------------------------------
    const [isPopupOpen, setPopupOpen] = useState(false);

    const openPopup = () => {
        setPopupOpen(true);
    };
    
    const closePopup = () => {
        setPopupOpen(false);
    };
    //-------------------------------------------------

    const themeName = ['solar light', 'nautilas', 'matrix', 'gruvbox dark','hedge','tron orange','godspeed','miami','bushido','mexican'];

return (
<div className=" h-16 flex  mt-auto mx-40 justify-end"> 
    <div className={`w-16 flex justify-center items-center font-bold text-2xl ${colorState.textcolor} hover:text-gray-400`} onClick={openPopup} >
        <IoColorPalette />
    </div>
    <div className={`flex justify-center items-center font-bold text-xl ${colorState.textcolor} hover:text-gray-400`} onClick={openPopup}>
        {themeName[colorState.cp-1]}
    </div>

    {
        <ColorPickerPopup isOpen={isPopupOpen} onClose={closePopup}/>
    }
</div>
);
};

export default Footer;
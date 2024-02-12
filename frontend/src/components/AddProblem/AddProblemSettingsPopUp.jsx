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

const AddProblemSettingsPopUp = ({ isOpen, onClose, settings,setSettings,children }) => {
  
    const [colorState,setColorState]= useContext(ColorContext);
    const [authState,setAuthState] = useContext(AuthContext);

    const handleClose = (e) => {
    // Close the popup only if the overlay is clicked
        if (e.target.classList.contains('overlay')) {
            onClose();
        }
    };

    const settingsToggle=(set1,set2)=>{
      setSettings(prevSettings => ({
        ...prevSettings,
        [set1]: {
            ...prevSettings[set1],
            [set2]: !prevSettings[set1][set2] // Update argmin to true
        }
    }));

    console.log(settings)
    }


    return (
    <>
      <div
        className={`fixed inset-0 overflow-y-auto transition-opacity duration-300 
        ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={handleClose} // Added onClick event for the entire popup
        >
        <div className="flex items-center justify-center min-h-screen">
          <div className="overlay fixed inset-0 bg-black opacity-50"></div>
          <div className={` z-40 ${colorState.bgcolor} ${colorState.textcolor} p-9 max-w-screen-lg w-60% mx-auto rounded-md shadow-md transition-transform  transform duration-300 `} >
            {/*
            <div className={`text-2xl mt-1 mx-1  ${colorState.captioncolor}`}>
            initiator
            </div>
            <div className={`flex`}>
                <div className={`${settings.initiator.randint?`${colorState.box2color} h-9 mt-1 mx-1 rounded-md flex justify-center items-center hover:bg-gray-400 w-25% font-semibold`:
                `${colorState.box1color} h-9 mt-1 mx-1 rounded-md flex justify-center items-center hover:bg-gray-400 w-25% font-semibold`}`}
                onClick={() => settingsToggle('initiator','randint')}>
                torch.randint
                </div>
                 <div className={`${settings.initiator.zeros?`${colorState.box2color} h-9 mt-1 mx-1 rounded-md flex justify-center items-center hover:bg-gray-400 w-25% font-semibold`:
                 `${colorState.box1color} h-9 mt-1 mx-1 rounded-md flex justify-center items-center hover:bg-gray-400 w-25% font-semibold`}`}
                 onClick={() => settingsToggle('initiator','zeros')}>
                torch.zeros
                </div>
                 <div className={`${settings.initiator.ones?`${colorState.box2color} h-9 mt-1 mx-1 rounded-md flex justify-center items-center hover:bg-gray-400 w-25% font-semibold`:
                 `${colorState.box1color} h-9 mt-1 mx-1 rounded-md flex justify-center items-center hover:bg-gray-400 w-25% font-semibold`}`}
                 onClick={() => settingsToggle('initiator','ones')}>
                torch.ones
                </div>
                 <div className={`${settings.initiator.arange?`${colorState.box2color} h-9 mt-1 mx-1 rounded-md flex justify-center items-center hover:bg-gray-400 w-25% font-semibold`:
                 `${colorState.box1color} h-9 mt-1 mx-1 rounded-md flex justify-center items-center hover:bg-gray-400 w-25% font-semibold`}`}
                 onClick={() => settingsToggle('initiator','arange')}>
                torch.arange
                </div>
              </div>*/}
            <div className={`text-2xl mt-4 mx-1  ${colorState.captioncolor}`}>
            manipulator
            </div>
            <div >
                <div className={`flex`}>
                     <div className={`${settings.manipulator.argwhere?`${colorState.box2color} h-9 mt-1 mx-1 rounded-md flex justify-center items-center hover:bg-gray-400 w-25% font-semibold`:
                     `${colorState.box1color} h-9 mt-1 mx-1 rounded-md flex justify-center items-center hover:bg-gray-400 w-25% font-semibold`}`}
                     onClick={() => settingsToggle('manipulator','argwhere')}>
                    torch.argwhere
                    </div>
                     <div className={`${settings.manipulator.tensor_split?`${colorState.box2color} h-9 mt-1 mx-1 rounded-md flex justify-center items-center hover:bg-gray-400 w-25% font-semibold`:
                     `${colorState.box1color} h-9 mt-1 mx-1 rounded-md flex justify-center items-center hover:bg-gray-400 w-25% font-semibold`}`}
                     onClick={() => settingsToggle('manipulator','tensor_split')}>
                    torch.tensor_split
                    </div>
                     <div className={`${settings.manipulator.gather?`${colorState.box2color} h-9 mt-1 mx-1 rounded-md flex justify-center items-center hover:bg-gray-400 w-25% font-semibold`:
                     `${colorState.box1color} h-9 mt-1 mx-1 rounded-md flex justify-center items-center hover:bg-gray-400 w-25% font-semibold`}`}
                     onClick={() => settingsToggle('manipulator','gather')}>
                    torch.gather
                    </div>
                     <div className={`${settings.manipulator.masked_select?`${colorState.box2color} h-9 mt-1 mx-1 rounded-md flex justify-center items-center hover:bg-gray-400 w-25% font-semibold`:
                     `${colorState.box1color} h-9 mt-1 mx-1 rounded-md flex justify-center items-center hover:bg-gray-400 w-25% font-semibold`}`}
                     onClick={() => settingsToggle('manipulator','masked_select')}>
                    torch.masked_select
                    </div>
                </div>
                <div className={`flex`}>
                     <div className={`${settings.manipulator.movedim?`${colorState.box2color} h-9 mt-1 mx-1 rounded-md flex justify-center items-center hover:bg-gray-400 w-25% font-semibold`:
                     `${colorState.box1color} h-9 mt-1 mx-1 rounded-md flex justify-center items-center hover:bg-gray-400 w-25% font-semibold`}`}
                     onClick={() => settingsToggle('manipulator','movedim')}>
                    torch.movedim
                    </div>
                     <div className={`${settings.manipulator.splicing?`${colorState.box2color} h-9 mt-1 mx-1 rounded-md flex justify-center items-center hover:bg-gray-400 w-25% font-semibold`:
                     `${colorState.box1color} h-9 mt-1 mx-1 rounded-md flex justify-center items-center hover:bg-gray-400 w-25% font-semibold`}`}
                     onClick={() => settingsToggle('manipulator','splicing')}>
                    splicing
                    </div>
                     <div className={`${settings.manipulator.t?`${colorState.box2color} h-9 mt-1 mx-1 rounded-md flex justify-center items-center hover:bg-gray-400 w-25% font-semibold`:
                     `${colorState.box1color} h-9 mt-1 mx-1 rounded-md flex justify-center items-center hover:bg-gray-400 w-25% font-semibold`}`}
                     onClick={() => settingsToggle('manipulator','t')}>
                    torch.t
                    </div>
                     <div className={`${settings.manipulator.take?`${colorState.box2color} h-9 mt-1 mx-1 rounded-md flex justify-center items-center hover:bg-gray-400 w-25% font-semibold`:
                     `${colorState.box1color} h-9 mt-1 mx-1 rounded-md flex justify-center items-center hover:bg-gray-400 w-25% font-semibold`}`}
                     onClick={() => settingsToggle('manipulator','take')}>
                    torch.take
                    </div>
                </div>
                <div className={`flex`}>
                     <div className={`${settings.manipulator.tile?`${colorState.box2color} h-9 mt-1 mx-1 rounded-md flex justify-center items-center hover:bg-gray-400 w-25% font-semibold`:
                     `${colorState.box1color} h-9 mt-1 mx-1 rounded-md flex justify-center items-center hover:bg-gray-400 w-25% font-semibold`}`}
                     onClick={() => settingsToggle('manipulator','tile')}>
                    torch.tile
                    </div>
                     <div className={`${settings.manipulator.unsqueeze?`${colorState.box2color} h-9 mt-1 mx-1 rounded-md flex justify-center items-center hover:bg-gray-400 w-25% font-semibold`:
                     `${colorState.box1color} h-9 mt-1 mx-1 rounded-md flex justify-center items-center hover:bg-gray-400 w-25% font-semibold`}`}
                     onClick={() => settingsToggle('manipulator','unsqueeze')}>
                    torch.unsqueeze
                    </div>
                     <div className={`${settings.manipulator.negative?`${colorState.box2color} h-9 mt-1 mx-1 rounded-md flex justify-center items-center hover:bg-gray-400 w-25% font-semibold`:
                     `${colorState.box1color} h-9 mt-1 mx-1 rounded-md flex justify-center items-center hover:bg-gray-400 w-25% font-semibold`}`}
                     onClick={() => settingsToggle('manipulator','negative')}>
                    torch.negative
                    </div>
                     <div className={`${settings.manipulator.positive?`${colorState.box2color} h-9 mt-1 mx-1 rounded-md flex justify-center items-center hover:bg-gray-400 w-25% font-semibold`:
                     `${colorState.box1color} h-9 mt-1 mx-1 rounded-md flex justify-center items-center hover:bg-gray-400 w-25% font-semibold`}`}
                     onClick={() => settingsToggle('manipulator','positive')}>
                    torch.positive
                    </div>
                </div>
                <div className={`flex`}>
                     <div className={`${settings.manipulator.where?`${colorState.box2color} h-9 mt-1 mx-1 rounded-md flex justify-center items-center hover:bg-gray-400 w-25% font-semibold`:
                     `${colorState.box1color} h-9 mt-1 mx-1 rounded-md flex justify-center items-center hover:bg-gray-400 w-25% font-semibold`}`}
                     onClick={() => settingsToggle('manipulator','where')}>
                    torch.where
                    </div>
                     <div className={`${settings.manipulator.remainder?`${colorState.box2color} h-9 mt-1 mx-1 rounded-md flex justify-center items-center hover:bg-gray-400 w-25% font-semibold`:
                     `${colorState.box1color} h-9 mt-1 mx-1 rounded-md flex justify-center items-center hover:bg-gray-400 w-25% font-semibold`}`}
                     onClick={() => settingsToggle('manipulator','remainder')}>
                    torch.remainder
                    </div>
                     <div className={`${settings.manipulator.clip?`${colorState.box2color} h-9 mt-1 mx-1 rounded-md flex justify-center items-center hover:bg-gray-400 w-25% font-semibold`:
                     `${colorState.box1color} h-9 mt-1 mx-1 rounded-md flex justify-center items-center hover:bg-gray-400 w-25% font-semibold`}`}
                     onClick={() => settingsToggle('manipulator','clip')}>
                    torch.clip
                    </div>
                     <div className={`${settings.manipulator.argmax?`${colorState.box2color} h-9 mt-1 mx-1 rounded-md flex justify-center items-center hover:bg-gray-400 w-25% font-semibold`:
                     `${colorState.box1color} h-9 mt-1 mx-1 rounded-md flex justify-center items-center hover:bg-gray-400 w-25% font-semibold`}`}
                     onClick={() => settingsToggle('manipulator','argmax')}>
                    torch.argmax
                    </div>
                </div>
                <div className={`flex`}>
                     <div className={`${settings.manipulator.argmin?`${colorState.box2color} h-9 mt-1 mx-1 rounded-md flex justify-center items-center hover:bg-gray-400 w-25% font-semibold`:
                     `${colorState.box1color} h-9 mt-1 mx-1 rounded-md flex justify-center items-center hover:bg-gray-400 w-25% font-semibold`}`}
                     onClick={() => settingsToggle('manipulator','argmin')}>
                    torch.argmin
                    </div>
                     <div className={`${settings.manipulator.sum?`${colorState.box2color} h-9 mt-1 mx-1 rounded-md flex justify-center items-center hover:bg-gray-400 w-25% font-semibold`:
                     `${colorState.box1color} h-9 mt-1 mx-1 rounded-md flex justify-center items-center hover:bg-gray-400 w-25% font-semibold`}`}
                     onClick={() => settingsToggle('manipulator','sum')}>
                    torch.sum
                    </div>
                     <div className={`${settings.manipulator.unique?`${colorState.box2color} h-9 mt-1 mx-1 rounded-md flex justify-center items-center hover:bg-gray-400 w-25% font-semibold`:
                     `${colorState.box1color} h-9 mt-1 mx-1 rounded-md flex justify-center items-center hover:bg-gray-400 w-25% font-semibold`}`}
                     onClick={() => settingsToggle('manipulator','unique')}>
                    torch.unique
                    </div>
                    <div className={`${colorState.bgcolor} h-9 mt-1 mx-1 rounded-md flex justify-center items-center ${colorState.textcolor3} w-25% font-semibold`}>
                    </div>
                </div>
            </div>
               
                <div className={`${colorState.box1color} h-9 mt-9 mx-1 rounded-md flex justify-center items-center hover:bg-gray-400 w-100% font-semibold`} onClick={onClose}>
                    ok
                </div>
            
                
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProblemSettingsPopUp;

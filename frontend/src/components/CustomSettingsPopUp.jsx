// Popup.js
import { AuthContext } from "./helpers/AuthContext";
import { ColorContext } from "./helpers/ColorContext";
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

/*

  "depth": 9223372036854776000,
  "initiator": {
    "id": 0,
    "randint": true,
    "zeros": true,
    "ones": true,
    "arange": true
  },
  "manipulator": {
    "id": 0,
    "argwhere": true,
    "tensor_split": true,
    "gather": true,
    "masked_select": true,
    "movedim": true,
    "splicing": true,
    "t": true,
    "take": true,
    "tile": true,
    "unsqueeze": true,
    "negative": true,
    "positive": true,
    "where": true,
    "remainder": true,
    "clip": true,
    "argmax": true,
    "argmin": true,
    "sum": true,
    "unique": true
  }


*/

const CustomSettingsPopUp = ({ isOpen, onClose, children }) => {
    const [colorState,setColorState]= useContext(ColorContext);
    const [times, setTimes] = useState([600, 1800, 3600]);
    const [selectedTime, setSelectedTime] = useState(0);
    const [minutes,setMinutes]=useState(10);
    const [seconds,setSeconds]=useState(0);
    const [authState,setAuthState] = useContext(AuthContext);

    const increaseTime = () => {
        if(selectedTime<times.length-1)
            setSelectedTime(selectedTime+1);
    };

    const decreaseTime = () => {
        if(selectedTime>0)
            setSelectedTime(selectedTime - 1);
    }

    const initializeTimeMode = () =>{
      
      axios.post("http://127.0.0.1:8000/api/time-mode/create/",{time:times[selectedTime].toString()})
      .then((response) => {
        console.log(response.data);
        console.log("okay----")
        setAuthState({
          quantityModeRunning:authState.quantityModeRunning,
          timerModeRunning:1
        })
        onClose();
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    }
  
    useEffect(() => {
        // This effect runs whenever selectedTime changes
        console.log(selectedTime)
        console.log(times[selectedTime])
        console.log(times[selectedTime]/60)
        setMinutes(times[selectedTime]/60);
        setSeconds(times[selectedTime]%60);
    }, [selectedTime]);

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
          <div className={` z-40 ${colorState.bgcolor} ${colorState.textcolor} p-9 max-w-screen-lg w-50% mx-auto rounded-md shadow-md transition-transform  transform duration-300 `} >
            <div className={`text-2xl font-bold`}>
                Settings
            </div >
            <div className={`mt-4 mx-1 font-bold`}>
            initiator
            </div>
            <div className={`flex`}>
                <div className={`${colorState.box1color} h-9 mt-1 mx-1 rounded-md flex justify-center items-center hover:bg-gray-400 w-25% font-semibold`}>
                torch.randit
                </div>
                <div className={`${colorState.box1color} h-9 mt-1 mx-1 rounded-md flex justify-center items-center hover:bg-gray-400 w-25% font-semibold`}>
                torch.zeros
                </div>
                <div className={`${colorState.box1color} h-9 mt-1 mx-1 rounded-md flex justify-center items-center hover:bg-gray-400 w-25% font-semibold`}>
                torch.ones
                </div>
                <div className={`${colorState.box1color} h-9 mt-1 mx-1 rounded-md flex justify-center items-center hover:bg-gray-400 w-25% font-semibold`}>
                torch.arange
                </div>

                </div>

            <div className={`mt-4 mx-1 font-bold`}>
            manipulator
            </div>
            <div >
                <div className={`flex`}>
                    <div className={`${colorState.box1color} h-9 mt-1 mx-1 rounded-md flex justify-center items-center hover:bg-gray-400 w-25% font-semibold`}>
                    torch.argwhere
                    </div>
                    <div className={`${colorState.box1color} h-9 mt-1 mx-1 rounded-md flex justify-center items-center hover:bg-gray-400 w-25% font-semibold`}>
                    torch.tensor_split
                    </div>
                    <div className={`${colorState.box1color} h-9 mt-1 mx-1 rounded-md flex justify-center items-center hover:bg-gray-400 w-25% font-semibold`}>
                    torch.gather
                    </div>
                    <div className={`${colorState.box1color} h-9 mt-1 mx-1 rounded-md flex justify-center items-center hover:bg-gray-400 w-25% font-semibold`}>
                    torch.masked_select
                    </div>
                </div>
                <div className={`flex`}>
                    <div className={`${colorState.box1color} h-9 mt-1 mx-1 rounded-md flex justify-center items-center hover:bg-gray-400 w-25% font-semibold`}>
                    torch.movedim
                    </div>
                    <div className={`${colorState.box1color} h-9 mt-1 mx-1 rounded-md flex justify-center items-center hover:bg-gray-400 w-25% font-semibold`}>
                    splicing
                    </div>
                    <div className={`${colorState.box1color} h-9 mt-1 mx-1 rounded-md flex justify-center items-center hover:bg-gray-400 w-25% font-semibold`}>
                    torch.t
                    </div>
                    <div className={`${colorState.box1color} h-9 mt-1 mx-1 rounded-md flex justify-center items-center hover:bg-gray-400 w-25% font-semibold`}>
                    torch.take
                    </div>
                </div>
                <div className={`flex`}>
                    <div className={`${colorState.box1color} h-9 mt-1 mx-1 rounded-md flex justify-center items-center hover:bg-gray-400 w-25% font-semibold`}>
                    torch.tile
                    </div>
                    <div className={`${colorState.box1color} h-9 mt-1 mx-1 rounded-md flex justify-center items-center hover:bg-gray-400 w-25% font-semibold`}>
                    torch.unsqueeze
                    </div>
                    <div className={`${colorState.box1color} h-9 mt-1 mx-1 rounded-md flex justify-center items-center hover:bg-gray-400 w-25% font-semibold`}>
                    torch.negative
                    </div>
                    <div className={`${colorState.box1color} h-9 mt-1 mx-1 rounded-md flex justify-center items-center hover:bg-gray-400 w-25% font-semibold`}>
                    torch.positive
                    </div>
                </div>
                <div className={`flex`}>
                    <div className={`${colorState.box1color} h-9 mt-1 mx-1 rounded-md flex justify-center items-center hover:bg-gray-400 w-25% font-semibold`}>
                    torch.where
                    </div>
                    <div className={`${colorState.box1color} h-9 mt-1 mx-1 rounded-md flex justify-center items-center hover:bg-gray-400 w-25% font-semibold`}>
                    torch.remainder
                    </div>
                    <div className={`${colorState.box1color} h-9 mt-1 mx-1 rounded-md flex justify-center items-center hover:bg-gray-400 w-25% font-semibold`}>
                    torch.clip
                    </div>
                    <div className={`${colorState.box1color} h-9 mt-1 mx-1 rounded-md flex justify-center items-center hover:bg-gray-400 w-25% font-semibold`}>
                    torch.argmax
                    </div>
                </div>
                <div className={`flex`}>
                    <div className={`${colorState.box1color} h-9 mt-1 mx-1 rounded-md flex justify-center items-center hover:bg-gray-400 w-25% font-semibold`}>
                    torch.argmin
                    </div>
                    <div className={`${colorState.box1color} h-9 mt-1 mx-1 rounded-md flex justify-center items-center hover:bg-gray-400 w-25% font-semibold`}>
                    torch.sum
                    </div>
                    <div className={`${colorState.box1color} h-9 mt-1 mx-1 rounded-md flex justify-center items-center hover:bg-gray-400 w-25% font-semibold`}>
                    torch.unique
                    </div>
                    <div className={`${colorState.bgcolor} h-9 mt-1 mx-1 rounded-md flex justify-center items-center ${colorState.textcolor3} w-25% font-semibold`}>
                    
                    </div>
                    

                </div>
                <div className={`${colorState.box1color} h-9 mt-9 mx-1 rounded-md flex justify-center items-center hover:bg-gray-400 w-100% font-semibold`} onClick={initializeTimeMode}>
                    ok
                    </div>

                
            </div>
                
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomSettingsPopUp;

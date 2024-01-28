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

const TimeSelectionPopUp = ({ isOpen, onClose, children }) => {
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
          <div className={` z-40 ${colorState.bgcolor} ${colorState.textcolor} p-9 max-w-screen-lg w-25% mx-auto rounded-md shadow-md transition-transform  transform duration-300 `} >
            <div className={`text-2xl font-bold`}>
                Set Duration
            </div>
            <div className={`mt-4`}>
            Total time: {minutes} minutes and {seconds} seconds
            </div>
            <div className={`${colorState.box1color} h-9 mt-1 rounded-md flex justify-between items-center `}>
               <IoIosArrowBack className={`hover:cursor-pointer hover:scale-150 pl-3 text-3xl font-bold`} onClick={decreaseTime}/>
               <p>{times[selectedTime]}</p>
               <IoIosArrowForward className={`hover:cursor-pointer hover:scale-150 pr-3 text-3xl font-bold`} onClick={increaseTime}/>
            </div>
            <div className={`mt-2`}>
            Change the time limit of set by increasing or decreasing
            </div>
            <div className={`${colorState.box1color} h-9 rounded-md mt-5 flex justify-center items-center hover:bg-gray-400`} onClick={initializeTimeMode}>
            ok, let’s start
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TimeSelectionPopUp;

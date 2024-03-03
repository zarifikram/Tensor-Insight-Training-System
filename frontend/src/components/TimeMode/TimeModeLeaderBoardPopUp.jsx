// Popup.js
import { AuthContext } from "../helpers/AuthContext";
import { ColorContext } from "../helpers/ColorContext";
import { EnvVariableContext } from "../helpers/EnvVariableContext";
import react,{ useContext, useEffect } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";//<RxCross2/>
import { IoMdCheckmark } from "react-icons/io";//<IoMdCheckmark />
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosCloseCircle } from "react-icons/io";
import { IoIosCheckmarkCircle } from "react-icons/io";
import axios from "axios";

import { useState } from "react";

const TimeModeLeaderBoardPopUp = ({ isOpen, onClose ,times}) => {
    const [colorState,setColorState]= useContext(ColorContext);
    const [envVariables,setEnvVariables] = useContext(EnvVariableContext);
    const [leaderboard,setLeaderboard] =useState([
      {
        "user": {
          "id": 4,
          "username": "whatever"
        },
        "current_problem_num": 3,
        "timestamp": "2024-02-11T17:21:39.724909Z"
      },
      {
        "user": {
          "id": 2,
          "username": "testuser"
        },
        "current_problem_num": 2,
        "timestamp": "2024-01-27T19:30:17.999349Z"
      },
      {
        "user": {
          "id": 4,
          "username": "whatever"
        },
        "current_problem_num": 2,
        "timestamp": "2024-02-11T18:12:07.597885Z"
      }
    ]);

    useEffect(() => {
      axios.get(`http://127.0.0.1:8000/api/time-mode/leaderboard/${600}`
      ).then((response) => {
        console.log(response.data);
        setLeaderboard(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    }, []);

    const handleClose = (e) => {
    // Close the popup only if the overlay is clicked
        if (e.target.classList.contains('overlay')) {
            onClose();
        }
    };

    const handleTimeChange = (value) => {
      // Convert value to number if necessary
      const selectedTime = parseInt(value);
      axios.get(`http://127.0.0.1:8000/api/time-mode/leaderboard/${selectedTime}`
      ).then((response) => {
        console.log(response.data);
        setLeaderboard(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
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
          <div className={` z-40 ${colorState.bgcolor} ${colorState.textcolor} p-4 max-w-screen-lg w-80% mx-auto rounded-md shadow-md transition-transform  transform duration-300 `} >
          
          <div className={`text-2xl ${colorState.captioncolor} font-bold pb-5`}>Quantity Mode Leaderboard</div>
          <div className={`flex justify-end`}>
              <select
              name="timeOptions"
              className={`${colorState.box1color} rounded-md py-1 px-3`}
              onChange={(e) => handleTimeChange(e.target.value)}
            >
              <option value="600">10 minutes</option>
              <option value="1800">30 minutes</option>
              <option value="3600">1 hour</option>
            </select>
          </div>
                <div className="">
                  <div className="">
                      <div  className={`flex items-center py-2  justify-between ${colorState.textcolor2}`}>
                        <div className="px-4">Rank</div> {/* Rank */}
                        <div className="px-4">Username </div>
                        <div className="px-4">current_problem_num</div>
                        <div className="px-4">Timestamp</div>
                      </div>
                  </div>
                  <div className="flex flex-col">
                    {leaderboard.map((item, index) => (
                      <div key={index} className="flex items-center py-2 justify-between">
                        <div className="px-4">{index + 1}</div> {/* Rank */}
                        <div className="px-4">{item.user.username}</div>
                        <div className="px-4">{item.current_problem_num}</div>
                        <div className="px-4">{new Date(item.timestamp).toLocaleString('en-US', { 
                            month: 'short', 
                            day: '2-digit', 
                            year: 'numeric', 
                            hour: 'numeric', 
                            minute: '2-digit', 
                            second: '2-digit', 
                            hour12: true 
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
              </div>
          
          
          
           </div> 
        </div>
      </div>
    </>
  );
};

export default TimeModeLeaderBoardPopUp;

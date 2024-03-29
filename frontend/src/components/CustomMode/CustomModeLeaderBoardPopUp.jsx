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

const CustomModeLeaderBoardPopUp = ({ isOpen, onClose }) => {
    const [colorState,setColorState]= useContext(ColorContext);
    const [envVariables,setEnvVariables] = useContext(EnvVariableContext);
    const [leaderboard,setLeaderboard] =useState([
      {
        "id": 4,
        "username": "whatever",
        "solved_problems": 7
      },
      {
        "id": 2,
        "username": "testuser",
        "solved_problems": 1
      },
      {
        "id": 5,
        "username": "saif",
        "solved_problems": 1
      }
    ]);

    useEffect(() => {
      axios.get(`${envVariables.backendDomain}api/custom-mode/leaderboard/`
      ).then((response) => {
        console.log(response.data);
        setLeaderboard(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    }, [isOpen]);

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
          <div className={` z-40 ${colorState.bgcolor} ${colorState.textcolor} p-4 max-w-screen-lg w-80% mx-auto rounded-md shadow-md transition-transform  transform duration-300 `} >
          
          <div className={`text-2xl ${colorState.captioncolor} font-bold pb-5`}>Custom Mode Leaderboard</div>
                <div className="">
                  <div className="">
                      <div  className={`flex items-center py-2  justify-between ${colorState.textcolor2}`}>
                        <div className="px-4">Rank</div> {/* Rank */}
                        <div className="px-4">Username </div>
                        <div className="px-4">Number of Problems</div>
                      </div>
                  </div>
                  <div className="flex flex-col">
                    {leaderboard.map((item, index) => (
                      <div key={index} className="flex items-center py-2 justify-between">
                        <div className="px-4">{index + 1}</div> {/* Rank */}
                        <div className="px-4">{item.username}</div>
                        <div className="px-4">{item.solved_problems}</div>
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

export default CustomModeLeaderBoardPopUp;

import { AuthContext } from "../helpers/AuthContext";
import { ColorContext } from "../helpers/ColorContext";
import { RxCross2 } from "react-icons/rx";//<RxCross2/>
import { IoMdCheckmark } from "react-icons/io";//<IoMdCheckmark />
import React, { useContext } from "react";
import { useState } from "react";
import { EnvVariableContext } from "../helpers/EnvVariableContext";

import axios from 'axios';
import { useEffect } from "react";
import Cookies from 'js-cookie';
import { useRef } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router";

function secondsToTime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  const formattedHours = hours.toString().padStart(2, '0');
  const formattedMinutes = minutes.toString().padStart(2, '0');
  const formattedSeconds = remainingSeconds.toString().padStart(2, '0');

  return `${formattedHours}:${formattedMinutes}:${Math.floor(formattedSeconds)}`;
}

const ContestLeaderboard = (id) =>{
    const [colorState,setColorState]= useContext(ColorContext);
    const [authState,setAuthState] = useContext(AuthContext);
    const [envVariables,setEnvVariables] = useContext(EnvVariableContext);
    const [rankList,setRankList] = useState([
        {
          "user_id": 2,
          "username": "testuser",
          "submissions": [
            {
              "isSolved": false,
              "attempted": 0,
              "lastSubmissionTime": null
            },
            {
              "isSolved": false,
              "attempted": 0,
              "lastSubmissionTime": null
            },
            {
              "isSolved": false,
              "attempted": 0,
              "lastSubmissionTime": null
            },
            {
              "isSolved": false,
              "attempted": 0,
              "lastSubmissionTime": null
            },
            {
              "isSolved": true,
              "attempted": 1,
              "lastSubmissionTime": 41812.065879
            },
            {
              "isSolved": false,
              "attempted": 0,
              "lastSubmissionTime": null
            },
            {
              "isSolved": false,
              "attempted": 0,
              "lastSubmissionTime": null
            },
            {
              "isSolved": false,
              "attempted": 0,
              "lastSubmissionTime": null
            },
            {
              "isSolved": false,
              "attempted": 0,
              "lastSubmissionTime": null
            },
            {
              "isSolved": false,
              "attempted": 0,
              "lastSubmissionTime": null
            },
            {
              "isSolved": false,
              "attempted": 0,
              "lastSubmissionTime": null
            },
            {
              "isSolved": false,
              "attempted": 0,
              "lastSubmissionTime": null
            },
            {
              "isSolved": false,
              "attempted": 0,
              "lastSubmissionTime": null
            },
            {
              "isSolved": false,
              "attempted": 0,
              "lastSubmissionTime": null
            },
            {
              "isSolved": false,
              "attempted": 0,
              "lastSubmissionTime": null
            },
            {
              "isSolved": false,
              "attempted": 0,
              "lastSubmissionTime": null
            },
            {
              "isSolved": false,
              "attempted": 0,
              "lastSubmissionTime": null
            },
            {
              "isSolved": false,
              "attempted": 0,
              "lastSubmissionTime": null
            },
            {
              "isSolved": false,
              "attempted": 0,
              "lastSubmissionTime": null
            },
            {
              "isSolved": false,
              "attempted": 0,
              "lastSubmissionTime": null
            }
          ]
        }
      ])

    useEffect(() => {
        console.log(id);
        axios.get(`${envVariables.backendDomain}api/contest/${id.id}/rank-list/`)
            .then((response) => {
                console.log(response.data);
                setRankList(response.data)
            }).catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []); 

    // useEffect(() => {
    //     // Function to update time remaining every second
    //     const intervalId = setInterval(() => {
    //         axios.get(`${envVariables.backendDomain}api/contest/${id}/rank-list/`)
    //         .then((response) => {
    //             console.log(response.data);
    //             setRankList(response.data)
    //         }).catch((error) => {
    //             console.error("Error fetching data:", error);
    //         });
    //     }, 1000);

    //     // Clear the interval when component unmounts or when problemList changes
    //     return () => clearInterval(intervalId);
    // }, [rankList]);

    return(
    <div className={` ${colorState.textcolor} font-roboto`}> 
    <div className={`text-2xl font-bold ${colorState.textcolor2} py-4 mt-16`}>Rank List</div>
    <div className={`flex`}>
    <div className=" p-2 w-32">Contestants</div>
                   {rankList[0].submissions.map((submission, index) => (
          <React.Fragment key={index}>
            <div className=" p-2 w-32">Problem {index + 1}</div>
          </React.Fragment>
        ))}
        </div>

        <div className={`${colorState.box1color} h-2 rounded-full`}></div>
      <div className="container ">
      {rankList.map((user, index) => (
        <div key={index} className=" mb-4">
          
          <div className=" mt-4 flex">
          <h2 className="font-bold text-lg p-2 w-32">{user.username}</h2>
            {user.submissions.map((submission, subIndex) => (
              <div key={subIndex} className={` flex justify-center p-2  w-32 ${(submission.isSolved)?`bg-green-500 text-gray-800 rounded-md mr-1 flex items-center`:`${submission.attempted>0?`bg-red-600 text-gray-100 rounded-md mr-1`:``}`}`}>
                {
                       (submission.isSolved)? <div className={``}>{secondsToTime(submission.lastSubmissionTime)}</div>:<div>Attempted: {submission.attempted} times</div>
                }
                
                
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
       
    </div>
    );
    
    };
    
    export default ContestLeaderboard;
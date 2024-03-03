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

const ContestLeaderboard = (id) =>{
    const [colorState,setColorState]= useContext(ColorContext);
    const [authState,setAuthState] = useContext(AuthContext);
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
        axios.get(`http://127.0.0.1:8000/api/contest/${id.id}/rank-list/`)
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
    //         axios.get(`http://127.0.0.1:8000/api/contest/${id}/rank-list/`)
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
              <div key={subIndex} className={` p-2  w-32 ${(submission.isSolved)?`bg-green-600`:`${submission.attempted>0?`bg-red-600`:``}`}`}>
                {
                       (submission.isSolved)? <div>{submission.lastSubmissionTime}</div>:<div>Attempted: {submission.attempted} times</div>
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
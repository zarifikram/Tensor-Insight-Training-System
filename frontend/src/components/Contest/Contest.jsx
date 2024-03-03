import { AuthContext } from "../helpers/AuthContext";
import { ColorContext } from "../helpers/ColorContext";
import React, { useContext } from "react";
import { useState } from "react";
import { EnvVariableContext } from "../helpers/EnvVariableContext";

import axios from 'axios';
import { useEffect } from "react";
import Cookies from 'js-cookie';
import { useRef } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router";

import ContestLeaderboard from "./ContestLeaderboard";

const Contest = () =>{
    let {id} = useParams();
    const navigate = useNavigate();

    const [colorState,setColorState]= useContext(ColorContext);
    const [authState,setAuthState] = useContext(AuthContext);
    const [envVariables,setEnvVariables] = useContext(EnvVariableContext);
    const [problemList,setProblemList] = useState({
        "id": 1,
        "title": "2024-01-27",
        "start_time": "2024-01-27T07:39:58.739665Z",
        "end_time": "2024-01-28T07:39:56.416985Z",
        "users_count": 1,
        "problem_list": [
          {
            "id": 1,
            "solve_count": 1,
            "try_count": 2
          },
          {
            "id": 2,
            "solve_count": 0,
            "try_count": 1
          },
          {
            "id": 3,
            "solve_count": 0,
            "try_count": 1
          },
        ],
        "status": "Ended"
      })

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/contest/${id}/`)
            .then((response) => {
                console.log(response.data);
                setProblemList(response.data)
            }).catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []); 


    


    const calculateTime = (startTime, endTime) => {
        const currentTime = new Date();
        const contestStartTime = new Date(startTime);
        const contestEndTime = new Date(endTime);

        if (currentTime < contestStartTime) {
            const timeToStart = contestStartTime - currentTime;
            return `Starts in ${Math.ceil(timeToStart / (1000 * 60 * 60))} hours`;
        } else if (currentTime > contestEndTime) {
            return `Ended at ${contestEndTime.toLocaleString()}`;
        } else {
            const timeRemaining = contestEndTime - currentTime;
            return `Ends in ${Math.ceil(timeRemaining / (1000 * 60 * 60))} hours`;
        }
    };

    const [timeRemaining, setTimeRemaining] = useState(calculateTime(problemList.start_time, problemList.end_time));

    useEffect(() => {
        // Function to update time remaining every second
        const intervalId = setInterval(() => {
            const remainingTime = calculateTime(problemList.start_time, problemList.end_time);
            setTimeRemaining(remainingTime);
        }, 1000);

        // Clear the interval when component unmounts or when problemList changes
        return () => clearInterval(intervalId);
    }, [problemList.start_time, problemList.end_time]);

    return(
    <div className={`mx-40 ${colorState.textcolor} font-roboto`}>    
            <div>
                title:{problemList.title}
            </div>
            <div>
                user count:{problemList.users_count}
            </div>
            <div>
            <div>{timeRemaining}</div>
            </div>
            <div className={`text-2xl font-bold ${colorState.textcolor2} py-4`}>Problem List</div>
            <div className={`w-full py-3 flex items-center `}>
                <div className={`text-xl font-bold `}>Problem</div>
                <div className={`text-lg ml-12`}>solve count</div>
                <div className={`text-lg ml-20`}>try count</div>
                <div className={`text-lg`}></div>
                {id}
            </div>
            {problemList.problem_list.map((contest, index) => (
                <div key={contest.id} className={`w-full p-2 flex items-center ${((index+1)%2==1)?`${colorState.box1color} rounded-md`:``}`}>
                    <div className={`text-xl font-bold ${colorState.captioncolor}`}>{index+1}</div>
                    <div className={`text-lg ml-32`}>{contest.solve_count}</div>
                    <div className={`text-lg ml-32`}>{contest.try_count}</div>
                    <div className={`text-lg ml-auto py-1 px-2 rounded-md ${((index+1)%2==0)?`${colorState.box1color} rounded-md`:`${colorState.bgcolor}`} hover:bg-gray-400`}
                    onClick={()=>navigate(`/ContestProblem/${id}/${contest.id}`)}>Go to Problem</div>
                </div>
            ))}
       <ContestLeaderboard id={id}></ContestLeaderboard>
    </div>
    );
    
    };
    
    export default Contest;
import { AuthContext } from "../helpers/AuthContext";
import { ColorContext } from "../helpers/ColorContext";
import React, { useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router";

import axios from 'axios';
import { useEffect } from "react";
import Cookies from 'js-cookie';
import { useRef } from "react";

const ContestList = () =>{

    const navigate = useNavigate();

    const [colorState,setColorState]= useContext(ColorContext);
    const [authState,setAuthState] = useContext(AuthContext);
    const [contestList,setContestList] = useState([
        {
          "id": 0,
          "title": "string",
          "users_count": 0,
          "is_user_added": true,
          "start_time": "2024-02-11T09:59:44.458Z",
          "end_time": "2024-02-11T09:59:44.458Z"
        }
      ])

    const [visibilityStates, setVisibilityStates] = useState([]);

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/contest-list/`)
            .then((response) => {
                console.log(response.data);
                setContestList(response.data);
                setVisibilityStates(new Array(response.data.length).fill(false));
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

    const [c_id, setC_id] = useState("C id");
    const [passkey,setPasskey] =useState("passkey")
    

    const joinContest = (contId,index) =>{
        if(contestList[index].is_user_added===true)
            setVisibilityStates(prevStates => {
                const updatedStates = [...prevStates];
                updatedStates[index] = !updatedStates[index];
                return updatedStates;
            });
        else{
            axios.post(`http://127.0.0.1:8000/api/contest/${contestList[index].id}/add-user/`,{
                "c_id": "string",
                "passkey": "string"
            }).then((response) => {
                console.log(response.data);
                navigate(`/Contest/${contId}`)
            }).catch((error) => {
                console.error("Error fetching data:", error);
            });
            
        }
            
    }

    const handleEditChange1 = (event) => {
        setC_id(event.target.value);
    };

    const handleEditChange2 = (event) => {
        setPasskey(event.target.value);
    };

    return(
    <div className={`mx-40 ${colorState.textcolor} font-roboto`}>    
            <div className={`text-2xl font-bold ${colorState.textcolor2} py-4`}>Constest List</div>
            <div className={`w-full py-3 flex items-center `}>
                <div className={`text-xl font-bold `}>Contest Title</div>
                <div className={`text-lg ml-12`}>user count</div>
                <div className={`text-lg ml-20`}>time</div>
                <div className={`text-lg`}></div>
            </div>
            {contestList.map((contest,index) => (
                <div className={``}>
                    <div key={contest.id} className={`w-full py-1 flex items-center `}>
                        <div className={`text-xl font-bold ${colorState.captioncolor}`}>{contest.title}</div>
                        <div className={`text-lg ml-32`}>{contest.users_count}</div>
                        <div className={`text-lg ml-32`}>{calculateTime(contest.start_time, contest.end_time)}</div>
                        <div className={`text-lg ml-auto p-2 rounded-md ${colorState.box1color} hover:bg-gray-400`} onClick={()=>joinContest(contest.id,index)}>join</div>
                    </div>
                    {visibilityStates[index] && (
                        <div className={`flex justify-end`}>
                            <input value="" onChange={handleEditChange1} className={`${colorState.box1color} p-1`} placeholder="Contest ID" />
                            <input value="" onChange={handleEditChange2} className={`ml-2 ${colorState.box1color} p-1`} placeholder="Passkey" />
                        </div>
                    )}
                </div>
            ))}
       
    </div>
    );
    
    };
    
    export default ContestList;
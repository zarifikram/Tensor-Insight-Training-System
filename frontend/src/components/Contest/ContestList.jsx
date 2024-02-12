import { AuthContext } from "../helpers/AuthContext";
import { ColorContext } from "../helpers/ColorContext";
import React, { useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router";

import axios from 'axios';
import { useEffect } from "react";
import Cookies from 'js-cookie';
import { useRef } from "react";

import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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



    const joinContest = (contId,index) =>{
        if(contestList[index].is_user_added===true)
            setVisibilityStates(prevStates => {
                const updatedStates = [...prevStates];
                updatedStates[index] = !updatedStates[index];
                return updatedStates;
            });
        else{
            axios.post(`http://127.0.0.1:8000/api/contest/${contestList[index].id}/add-user/`,{
                c_id: "string",
                passkey: "string"
            }).then((response) => {
                console.log(response.data);
                navigate(`/Contest/${contId}`)
            }).catch((error) => {
                console.error("Error fetching data:", error);
            });         
        }      
    }



    const currentTime = new Date().toISOString().slice(0, 16);
    const [title,setTitle] = useState("title");
    const [startTime,setStartTime] = useState(currentTime);
    const [endTime,setEndTime] = useState(currentTime);
    const [newcid,setNewcid] = useState("cid");
    const [newpasskey,setNewpasskey] = useState("passkey");
    const [numproblem,setNumproblem] = useState(3);

    const handleEditChange3 = (event) => {
        setTitle(event.target.value);
    };

    const handleEditChange4 = (event) => {
        setStartTime(event.target.value);
    };

    const handleEditChange5 = (event) => {
        setEndTime(event.target.value);
    };

    const handleEditChange6 = (event) => {
        setNewcid(event.target.value);
    };

    const handleEditChange7 = (event) => {
        setNewpasskey(event.target.value);
    };

    const handleEditChange8 = (event) => {
        setNumproblem(event.target.value);
    };

    const createContest = () =>{
        axios.post(`http://127.0.0.1:8000/api/create-contest/`,{
            contest: {
              title: title,
              start_time: startTime,
              end_time: endTime
            },
            c_id: newcid,
            passkey: newpasskey,
            num_random_problem: numproblem
          }).then((response) => {
            console.log(response.data);
            toast.success("Contest Created")
        }).catch((error) => {
            console.error("Error fetching data:", error);
        });
    }

    const [c_id, setC_id] = useState("C id");
    const [passkey,setPasskey] =useState("passkey")
    

    const handleEditChange1 = (event) => {
        setC_id(event.target.value);
    };

    const handleEditChange2 = (event) => {
        setPasskey(event.target.value);
    };

    const [cidtitle,setCidtitle] = useState("c_id/title");
    const [customContest,setCustomcontest] = useState();
    const [customvisible,setCustomvisible] = useState(false);

    const handleEditChange9 = (event) => {
        setCidtitle(event.target.value);
    };

    const searchproblem = () =>{
        console.log(cidtitle)
        axios.get(`http://127.0.0.1:8000/api/search-contest/?cid=${cidtitle}`
        ).then((response) => {
            console.log(response.data);
            setCustomcontest(response.data);
        }).catch((error) => {
            console.error("Error fetching data:", error);
        });
    }

    const toggleJoinCustomContest = () =>{
        setCustomvisible(prevState => !prevState);
    }

    const joinCustomContest = () =>{
        console.log(customContest.id)
        axios.post(`http://127.0.0.1:8000/api/contest/${customContest.id}/add-user/`,{
            c_id: c_id,
            passkey: passkey,
        }).then((response) => {
            console.log(response.data);
            navigate(`/Contest/${customContest.id}`)
        }).catch((error) => {
            console.error("Error fetching data:", error);
        });
    }

    return(
    <div className={`mx-40 ${colorState.textcolor} font-roboto`}>    
    <div className={`w-full ${colorState.box1color} rounded-md flex flex-col`}>
        <div className={`text-xl ${colorState.textcolor2} p-3 `}>Create New Contest</div>
        <div className={`flex`}>
            <div className={`pl-3`}>Title:</div><input value={title} onChange={handleEditChange3} className={`${colorState.bgcolor} p-1 mx-2 mb-2 rounded-md`} />
        </div>
        <div className={`flex`}>
            <div className={`pl-3`}>Start Time:</div><input value={startTime} type="datetime-local" onChange={handleEditChange4} className={`${colorState.bgcolor} p-1 mx-2 mb-2 rounded-md`} />
        </div>
        <div className={`flex`}>
            <div className={`pl-3`}>End Time:</div><input value={endTime} type="datetime-local" onChange={handleEditChange5} className={`${colorState.bgcolor} p-1 mx-2 mb-2 rounded-md`} />
        </div>
        <div className={`flex`}>
            <div className={`pl-3`}>Contest ID:</div><input value={newcid}  onChange={handleEditChange6} className={`${colorState.bgcolor} p-1 mx-2 mb-2 rounded-md`} />
        </div>
        <div className={`flex`}>
            <div className={`pl-3`}>Pass Key:</div><input value={newpasskey} onChange={handleEditChange7} className={`${colorState.bgcolor} p-1 mx-2 mb-2 rounded-md`} />
        </div>
        <div className={`flex`}>
            <div className={`pl-3`}>Number of problems: </div><input value={numproblem} type="number" onChange={handleEditChange8} className={`${colorState.bgcolor} p-1 mx-2 mb-2 rounded-md`} />
        </div>
        <div className={`flex justify-end`}><div className={`m-2 px-2 ${colorState.box2color}  hover:bg-gray-400 w-30% rounded-md flex justify-center text-xl font-bold `} onClick={createContest}>Create</div></div>
  </div>
  <div className={`w-full ${colorState.box1color} rounded-md flex flex-col mt-2`}>
        <div className={`text-xl ${colorState.textcolor2} p-3 `}>Search Custom Contest</div>
        <div className={`flex`}>
            <div className={`pl-3`}>Pass Key/Title: </div><input value={cidtitle} onChange={handleEditChange9} className={`${colorState.bgcolor} p-1 mx-2 mb-2 rounded-md`} />
        </div>
        <div className={`flex justify-end`}><div className={`m-2 px-2 ${colorState.box2color}  hover:bg-gray-400 w-30% rounded-md flex justify-center text-xl font-bold `} onClick={searchproblem}>Search</div></div>
        
  </div>

  {customContest && (
        <div>
            <div className={`text-2xl font-bold ${colorState.textcolor2} py-3 mt-7`}>Custom Contest</div>
            <div className={`w-full py-3 flex items-center `}>
                <div className={`text-xl font-bold `}>Contest Title</div>
                <div className={`text-lg ml-12`}>user count</div>
                <div className={`text-lg ml-20`}>time</div>
                <div className={`text-lg`}></div>
            </div>
            <div  className={`w-full py-1 flex items-center `}>
                        <div className={`text-xl font-bold ${colorState.captioncolor}`}>{customContest.title}</div>
                        <div className={`text-lg ml-32`}>{customContest.users_count}</div>
                        <div className={`text-lg ml-32`}>{calculateTime(customContest.start_time, customContest.end_time)}</div>
                        <div className={`text-lg ml-auto p-2 rounded-md ${colorState.box1color} hover:bg-gray-400`} onClick={()=>toggleJoinCustomContest()}>enter contest</div>
            </div>
            {customvisible && (
                       
                       <div className={`flex justify-end mt-1`}>
                           <input value={c_id} onChange={handleEditChange1} className={`${colorState.box1color} p-1 rounded-md`}  />
                           <input value={passkey} onChange={handleEditChange2} className={`ml-2 ${colorState.box1color} p-1 rounded-md`}  />
                           <div className={`p-1 ${colorState.box2color} rounded-md ml-1`} onClick={joinCustomContest}>join</div>
                       </div>
                   )}
        </div>)}


        <div className={`text-2xl font-bold ${colorState.textcolor2} py-3 mt-7`}>Contest List</div>
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
                        <div className={`text-lg ml-auto p-2 rounded-md ${colorState.box1color} hover:bg-gray-400`} onClick={()=>joinContest(contest.id,index)}>enter contest</div>
                    </div>
                </div>
            ))}

<ToastContainer />
       
    </div>
    );
    
    };
    
    export default ContestList;
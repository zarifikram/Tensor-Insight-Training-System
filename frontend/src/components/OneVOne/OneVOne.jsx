import { AuthContext } from "../helpers/AuthContext";
import { ColorContext } from "../helpers/ColorContext";
import { EnvVariableContext } from "../helpers/EnvVariableContext";
import React, { useContext } from "react";
import { useState } from "react";
import { ClipLoader } from 'react-spinners';

import axios from 'axios';
import { useEffect } from "react";
import Cookies from 'js-cookie';
import { useRef } from "react";
import { IoArrowBack, IoArrowForward } from "react-icons/io5";
import { FaAngry, FaHeart } from "react-icons/fa";
import { FaDownLong, FaKeyboard, FaUpLong } from "react-icons/fa6";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { IoMdCheckmark } from "react-icons/io";//<IoMdCheckmark />
import { RxCross2 } from "react-icons/rx";//<RxCross2/>
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import OneVOneProblem from "./OneVOneProblem";
import { FaTrophy } from "react-icons/fa";


function formatTime(seconds) {
    var hours = Math.floor(seconds / 3600);
    var minutes = Math.floor((seconds % 3600) / 60);
    var remainingSeconds = seconds % 60;

    return hours + " hours, " + minutes + " minutes, " + remainingSeconds + " seconds";
}

function calculateTimeLeft(startedAt, durationInSeconds) {
    const startTime = new Date(startedAt);
    const endTime = new Date(startTime.getTime() + durationInSeconds * 1000);
    const currentTime = new Date().getTime();
    const timeDifference = endTime - currentTime;

    if (timeDifference <= 0) {
      return "Ended";
    }

    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    return `${hours}h ${minutes}m ${seconds}s left`;
  }


  const calculateEndTime = (startedAt, durationInSeconds) => {
    const startTime = new Date(startedAt);
    const endTime = new Date(startTime.getTime() + durationInSeconds * 1000);
  
    let hours = endTime.getHours();
    const minutes = endTime.getMinutes();
    const seconds = endTime.getSeconds();
    const ampm = hours >= 12 ? 'pm' : 'am';
  
    // Convert hours to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // 0 should be converted to 12
  
    // Format single digit minutes and seconds with leading zeros
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
  
    return `${hours}:${formattedMinutes}:${formattedSeconds} ${ampm}`;
  };

const OneVOne = () => {
    const navigate = useNavigate();
    const [envVariables,setEnvVariables] = useContext(EnvVariableContext);
    const onevoneIni = {
        "title": "New One V One",
        "description": "This is The New One VS One challange",
        "duration": 40,
        "status": "created",
        "num_of_problem": 4,
        "user1": {
            "username": "saif",
            "id": 6,
            "score": 0.0
        },
        "user2": null,
        "started_at": null
    }

    const onevoneIni2 = {
        "title": "ertertert",
        "description": "dsdf",
        "duration": 600,
        "status": "started",
        "num_of_problem": 3,
        "user1": {
            "username": "hafiz",
            "id": 8,
            "score": 0.0
        },
        "user2": {
            "username": "saif",
            "id": 6,
            "score": 0.0
        },
        "started_at": "2024-02-27T18:15:35.586399Z",
        "problem_list": {
            "1": {
                "id": 108,
                "is_user1_solved": -1,
                "is_user2_solved": -1
            },
            "2": {
                "id": 109,
                "is_user1_solved": -1,
                "is_user2_solved": -1
            },
            "3": {
                "id": 110,
                "is_user1_solved": -1,
                "is_user2_solved": -1
            }
        }
    }
    const [key,setKey] = useState("")
    const [onevone, setOnevone] = useState(null)

    const [timeLeft, setTimeLeft] = useState("");

    useEffect(() => {
        if(onevone!=null)
        if(onevone.started_at!=null){
        const timerInterval = setInterval(() => {
          setTimeLeft(calculateTimeLeft(onevone.started_at,onevone.duration));
        }, 1000);
    
        return () => clearInterval(timerInterval);
            }
      }, [onevone]);

      

      useEffect(() => {
        const fetchData = () => {
          axios.get(`${envVariables.backendDomain}api/1-v-1/`)
            .then((response) => {
              setOnevone(response.data);
            }).catch((error) => {
              console.error("Error fetching data:", error);
            });

            axios.get(`${envVariables.backendDomain}api/1-v-1/status/`)
            .then((response) => {
              console.log(response.data)
              if(response.data.haveNew)
                toast.success(response.data.message);
            }).catch((error) => {
              console.error("Error fetching data:", error);
            });
        };
    
        fetchData(); // Call initially
    
        const interval = setInterval(() => {
          fetchData(); // Call at each interval
        }, 1000); // 1000 milliseconds = 1 second
    
        return () => clearInterval(interval); // Clean up interval on component unmount
      }, []); // Empty dependency array ensures effect runs only on mount
    

    const [colorState, setColorState] = useContext(ColorContext);
    const [authState, setAuthState] = useContext(AuthContext);

    const [isOpen, setIsOpen] = useState(false);

    const onClose = () => {
        setIsOpen(false);
    }

    const OpenPopUp = () => {
        if (authState.loggedIn)
            setIsOpen(true);
    }

    const [isOpen2, setIsOpen2] = useState(false);

    const onClose2 = () => {
        setIsOpen2(false);
    }

    const OpenPopUp2 = () => {
        if (authState.loggedIn)
            setIsOpen2(true);
    }

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'n') {
                OpenPopUp();
            }

            if (e.key === 'j') {
                OpenPopUp2();
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen]);

    const leave = () =>{
        axios.post(`${envVariables.backendDomain}api/1-v-1/left/`)
        .then((response) => {
          setOnevone(null);
        }).catch((error) => {
          console.error("Error fetching data:", error);
        });
    }

    const getStatus = () =>{
        axios.get(`${envVariables.backendDomain}api/1-v-1/status/`)
        .then((response) => {
          console.log(response.data)
        }).catch((error) => {
          console.error("Error fetching data:", error);
        });
    }

    return (
        <div className={`mx-40 ${colorState.textcolor} font-roboto`} >
            {
                (authState.loggedIn)&&(onevone === null) && <div><KeyBoardInstruction colorState={colorState} OpenPopUp={OpenPopUp} />
                    <KeyBoardInstruction2 colorState={colorState} OpenPopUp={OpenPopUp2} />
                </div>
            }
            {
                (onevone != null) && (<div> {(onevone.status === "created") && (<div>
                    <div className="w-full">
                        <div className={`flex justify-center  ${colorState.textcolor2} font-roboto font-bold text-3xl `}>{onevone.title}</div>
                        <div className={`flex justify-center  ${colorState.textcolor} mt-2`}>{onevone.description.length > 200 ? onevone.description.substring(0, 200) + "..." : onevone.description}</div>
                        <div className={`flex justify-center ${colorState.textcolor} mt-1`}><div className={`mr-2`}>One V One Key:</div><div>{key}</div></div>
                    </div>
                    <div className="w-full">  
                        <div className={`flex ${colorState.captioncolor}`}><div className={`mr-3 ${colorState.textcolor}`} >number of problems:</div> {onevone.num_of_problem}</div>
                        <div className={`flex ${colorState.captioncolor}`}><div className={`mr-3 ${colorState.textcolor}`} >duration:</div>{formatTime(onevone.duration)} </div>
                    </div>
                        
                            <div className="flex justify-center mt-10">
                            <ClipLoader color="#000" loading={true} size={70} />
                            </div>
                            <div className={`flex justify-center mt-2 ${colorState.captioncolor}`}>waiting for opponent to arrive</div>
                </div>)
                }

                {(onevone.status === "started") && (<div>
                    <div className="w-full">
                        <div className={`flex justify-center  ${colorState.textcolor2} font-roboto font-bold text-3xl`}>{onevone.title}</div>
                        <div className={`flex justify-center  ${colorState.textcolor} mt-2`}>{onevone.description.length > 200 ? onevone.description.substring(0, 200) + "..." : onevone.description}</div>
                    </div>
                    <div className={`flex justify-center text-2xl mt-3 ${colorState.captioncolor}`}>
                        <div className={`p-1   rounded-md flex ${(onevone.user1.score>onevone.user2.score)?`${colorState.box2color}`:``}`}>
                            <div className={`${(onevone.user1.score>onevone.user2.score)&&(timeLeft!="Ended")?`px-2 ${colorState.textcolor} text-2xl font-bold flex items-center`:`hidden`}`}>winning!</div>
                            <div className={`${(onevone.user1.score>onevone.user2.score)&&(timeLeft==="Ended")?`px-2 ${colorState.textcolor} text-2xl font-bold flex items-center `:`hidden`}`}><div className={`mr-2`}> <FaTrophy/></div> winner!</div>
                            <div className={`px-2 py-2 ${colorState.box1color} flex rounded-md`}>
                                <div className={`px-2 py-1 ${colorState.bgcolor} rounded-md`}>{onevone.user1.username}</div>
                                <div className={`pl-2 py-1 ${colorState.textcolor2}`}>{onevone.user1.score}</div>
                            </div>
                        </div>
                        <div className={`mx-2 flex items-center`}>vs</div>
                        <div  className={`p-1  rounded-md flex  ${(onevone.user2.score>onevone.user1.score)?`${colorState.box2color}`:``}`}>
                            <div className={`px-2 py-2 ${colorState.box1color} flex rounded-md`}>
                                <div className={`pr-2 py-1 ${colorState.textcolor2}`}>{onevone.user2.score}</div>
                                <div className={`px-2 py-1 ${colorState.bgcolor} rounded-md`}>{onevone.user2.username}</div>
                            </div>
                            <div className={`${(onevone.user2.score>onevone.user1.score)&&(timeLeft!="Ended")?`px-2 ${colorState.textcolor} text-2xl font-bold flex items-center`:`hidden`}`}>winning!</div>
                            <div className={`${(onevone.user2.score>onevone.user1.score)&&(timeLeft==="Ended")?`px-2 ${colorState.textcolor} text-2xl font-bold flex items-center `:`hidden`}`}><div className={`mr-2`}> <FaTrophy/></div> winner!</div>
                        </div>
                    </div>
                    <div className={`flex justify-center`}> 
                    <div className={`flex justify-center items-center text-2xl mt-2 py-2 px-5 ${colorState.captioncolor} rounded-full ${colorState.box1color}`}>
                    {timeLeft}
                    </div>
                    </div>
                    <div className="w-full">  
                        <div className={`flex ${colorState.captioncolor}`}><div className={`mr-3 ${colorState.textcolor}`} >number of problems:</div> {onevone.num_of_problem}</div>
                        <div className={`flex ${colorState.captioncolor}`}><div className={`mr-3 ${colorState.textcolor}`} >duration:</div>{formatTime(onevone.duration)}</div>
                        <div className={`flex ${colorState.captioncolor}`}><div className={`mr-3 ${colorState.textcolor}`} >ends at:</div>{calculateEndTime(onevone.started_at,onevone.duration)}</div>
                    </div>
                    <div className={`mt-3 pt-1 px-2 pb-2 ${colorState.box1color} rounded-md`}>
                        <div className={`flex text-xl`}>
                            <div className={`w-10% flex justify-start pl-2`}>Problem</div>
                            <div className={`w-45% flex justify-center`}>{onevone.user1.username}</div>
                            <div className={`w-45% flex justify-center`}>{onevone.user2.username}</div>
                        </div>
                        {Object.keys(onevone.problem_list).map((key,index) => (
                            <div key={key} className={`flex text-xl p-1 hover:bg-gray-400 rounded-md ${(index%2==0)?`${colorState.bgcolor}`:``}`} onClick={()=>{
                                if(timeLeft!="Ended")
                                navigate(`/OneVOneProblem/${onevone.problem_list[key].id}`)}}>
                                <div className={`flex w-10% ${colorState.textcolor2} mr-2`}><div className={`mr-2`}>Problem</div>{index + 1}:</div>
                                <div className={`mr-3 flex justify-center w-45%`}>
                                    <div>{
                                    (onevone.problem_list[key].is_user1_solved==-1)&&(<div>---</div>)
                                    }{
                                    (onevone.problem_list[key].is_user1_solved>-1)&&(<div className={`flex`}>{onevone.problem_list[key].is_user1_solved.toFixed(2)}<div className={`ml-1`}>s</div></div>)
                                    }</div> 
                                </div>
                                <div className={`flex justify-center w-45%`}>
                                <div>{
                                    (onevone.problem_list[key].is_user2_solved==-1)&&(<div>---</div>)
                                    }{
                                    (onevone.problem_list[key].is_user2_solved>-1)&&(<div className={`flex`}>{onevone.problem_list[key].is_user2_solved.toFixed(2)}<div className={`ml-1`}>s</div></div>)
                                    }</div> 
                                </div>
                            </div>
                        ))}  
                    </div>
                    <div className={` flex justify-center text-2xl mt-2 py-2 px-5 hover:bg-gray-400 ${colorState.captioncolor} rounded-md ${colorState.box1color} w-32`} onClick={leave}>
                        Leave
                    </div>
                </div>)
                } </div>)
            }
            {
                (onevone === null) && (<div className={`flex justify-center mt-32 text-3xl font-bold ${colorState.textcolor2}`}>
                    No One Vs One is Found!
                </div>)
            }
            <NewOneVOne colorState={colorState} onClose={onClose} isOpen={isOpen} setKey={setKey} />
            <JoinOneVOne colorState={colorState} onClose={onClose2} isOpen={isOpen2} />
            <ToastContainer />
        </div>
    );

};

export default OneVOne;

const KeyBoardInstruction = ({ colorState, OpenPopUp }) => {
    return (
        <div className="flex justify-center h-8">
            <div className="text-4xl font-roboto font-bold">
                <div className={` flex items-center center h-full hover:bg-gray-400 p-1 rounded-md`} onClick={OpenPopUp}>
                    <div className={`${colorState.box1color} mr-2 py-1 px-2 items-center rounded-md ${colorState.textcolor} text-sm`}>n</div>
                    <p className={`${colorState.textcolor} text-sm`}>- Create New One vs One</p>
                </div>
            </div>
        </div>
    );
}

const KeyBoardInstruction2 = ({ colorState, OpenPopUp }) => {
    return (
        <div className="flex justify-center h-8">
            <div className="text-4xl font-roboto font-bold">
                <div className={` flex items-center center h-full hover:bg-gray-400 p-1 rounded-md`} onClick={OpenPopUp}>
                    <div className={`${colorState.box1color} mr-2 py-1 px-2 items-center rounded-md ${colorState.textcolor} text-sm`}>j</div>
                    <p className={`${colorState.textcolor} text-sm`}>- Join New Contest</p>
                </div>
            </div>
        </div>
    );
}


//New Problem Addition-----------------------------

const NewOneVOne = ({ colorState, onClose, isOpen,setKey }) => {
    const [envVariables,setEnvVariables] = useContext(EnvVariableContext);
    const handleClose = (e) => {
        if (e.target.classList.contains('overlay')) {
            onClose();
        }
    }

    const [title, setTitle] = useState('');

    const handleChange1 = (event) => {
        setTitle(event.target.value);
    };

    const [description, setDescription] = useState('');

    const handleChange2 = (event) => {
        setDescription(event.target.value);
    };

    const [duration, setDuration] = useState(1)

    const handleChange3 = (event) => {
        setDuration(event.target.value);
    };

    const [numberOfProblem, setNumberOfProblem] = useState(1)

    const handleChange4 = (event) => {
        setNumberOfProblem(event.target.value);
    };


    const Submit = () => {
        axios.post(`${envVariables.backendDomain}api/1-v-1/create/`, {
            title: title,
            description: description,
            duration: duration,
            num_of_problem: numberOfProblem,
        }).then((response) => {
            setKey(response.data.key)
            toast.success("One Vs One Created")
        }).catch((error) => {
            console.error("Error fetching data:", error);
        });

        onClose();
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
                    <div className={` z-40 ${colorState.bgcolor} ${colorState.textcolor} p-10 max-w-screen-lg w-90% mx-auto rounded-md shadow-md transition-transform  transform duration-300 `} >

                        <div className={`${colorState.captioncolor} font-roboto text-4xl font-bold w-5/6 h-fit mb-12`}> add new one vs one</div>

                        <div className="flex-col h-fit mb-8">
                            <div className={`font-roboto text-2xl ${colorState.textcolor2} mb-2`}>title</div>
                            <div className={`font-roboto text-sm ${colorState.textcolor} mb-2`}>pick a suitable title for the discussion</div>
                            <textarea className={`w-full h-40 rounded-lg p-4 ${colorState.box1color} font-roboto  ${colorState.textcolor}  text-2xl `}
                                value={title}
                                onChange={handleChange1} />
                        </div>

                        <div className="flex-col h-fit mb-8">
                            <div className={`font-roboto text-2xl ${colorState.textcolor2} mb-2`}>description</div>
                            <div className={`font-roboto text-sm ${colorState.textcolor} mb-2`}>Limit the amount of character used to write the code. Use 0 for no limit</div>
                            <textarea className={`w-full h-40 rounded-lg p-4 ${colorState.box1color}  font-roboto  ${colorState.textcolor}  text-2xl `}
                                value={description}
                                onChange={handleChange2} />
                        </div>

                        <div className="flex-col h-fit mb-8">
                            <div className={`font-roboto text-2xl ${colorState.textcolor2} mb-2`}>duration</div>

                            <input className={`w-full  rounded-lg p-4 ${colorState.box1color}  font-roboto  ${colorState.textcolor}  text-2xl `}
                                value={duration}
                                type="number"
                                min={1}
                                onChange={handleChange3} />
                        </div>

                        <div className="flex-col h-fit mb-8">
                            <div className={`font-roboto text-2xl ${colorState.textcolor2} mb-2`}>number of problem</div>

                            <input className={`w-full  rounded-lg p-4 ${colorState.box1color}  font-roboto  ${colorState.textcolor}  text-2xl `}
                                value={numberOfProblem}
                                type="number"
                                min={1}
                                onChange={handleChange4} />
                        </div>

                        <div className={`flex justify-center`}>
                            <div className={`${colorState.box1color} ${colorState.textcolor} py-2 px-3 rounded-md hover:bg-gray-400`} onClick={Submit}> Create New Contest</div>
                        </div>



                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    );
}



const JoinOneVOne = ({ colorState, onClose, isOpen }) => {
    const [envVariables,setEnvVariables] = useContext(EnvVariableContext);
    const handleClose = (e) => {
        if (e.target.classList.contains('overlay')) {
            onClose();
        }
    }

    const [key, setKey] = useState('');
    const handleChange1 = (event) => {
        setKey(event.target.value);
    };

    const Submit = () => {
        axios.post(`${envVariables.backendDomain}api/1-v-1/join/`, {
            key: key,
        }).then((response) => {
            toast.success("You Have Joined a New OneVOne!")
        }).catch((error) => {
            console.error("Error fetching data:", error);
        });
        onClose();
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
                    <div className={` z-40 ${colorState.bgcolor} ${colorState.textcolor} p-10 max-w-screen-lg w-30% mx-auto rounded-md shadow-md transition-transform  transform duration-300 `} >

                        <div className={`${colorState.captioncolor} font-roboto text-4xl font-bold w-5/6 h-fit mb-12`}> join one vs one</div>

                        <div className="flex-col h-fit mb-8">
                            <div className={`font-roboto text-2xl ${colorState.textcolor2} mb-2`}>Give Contest Key</div>
                            <input className={`w-full h-20 rounded-lg p-4 ${colorState.box1color} font-roboto  ${colorState.textcolor}  text-2xl `}
                                value={key}
                                onChange={handleChange1} />
                        </div>

                        <div className={`flex justify-center`}>
                            <div className={`${colorState.box1color} ${colorState.textcolor} py-2 px-3 rounded-md hover:bg-gray-400`} onClick={Submit}> Join Contest</div>
                        </div>

                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    );
}







import { AuthContext } from "../helpers/AuthContext";
import { ColorContext } from "../helpers/ColorContext";
import React, { useContext } from "react";
import { useState } from "react";

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


function formatTime(seconds) {
    var hours = Math.floor(seconds / 3600);
    var minutes = Math.floor((seconds % 3600) / 60);
    var remainingSeconds = seconds % 60;

    return hours + " hours, " + minutes + " minutes, " + remainingSeconds + " seconds";
}

const OneVOne = () => {
    const navigate = useNavigate();
  
    const onevoneIni =  {
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

    const [onevone,setOnevone]=useState(onevoneIni)

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/1-v-1/`)
            .then((response) => {
                setOnevone(response.data);
            }).catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []); 

    const [colorState, setColorState] = useContext(ColorContext);
    const [authState, setAuthState] = useContext(AuthContext);

    const [isOpen,setIsOpen] =useState(false);
    
    const onClose = () =>{
        setIsOpen(false);
    }

    const OpenPopUp = () =>{
        if(authState.loggedIn)
        setIsOpen(true);
    }

    const [isOpen2,setIsOpen2] =useState(false);
    
    const onClose2 = () =>{
        setIsOpen2(false);
    }

    const OpenPopUp2 = () =>{
        if(authState.loggedIn)
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

    const GoToDiscussion = (id) =>{
       // navigate(`/Discussion/${id}`);
    }
 
    return (
        <div className="  h-5/6 flex flex-col">
            {
                (authState.loggedIn)&& <div><KeyBoardInstruction colorState={colorState} OpenPopUp={OpenPopUp} />
                                    <KeyBoardInstruction2 colorState={colorState} OpenPopUp={OpenPopUp2} />
                </div>
            }

            <div className=" h-full items-center overflow-y-auto">
            <div className="h-fit flex flex-col items-center ">

            
    <div className="flex h-36 w-5/6 mb-8 cursor-pointer"  onClick={()=>{GoToDiscussion(onevone.id)}}>
        <div className="w-3/5">
            <div className={`flex flex-col h-3/5 ${colorState.textcolor2} font-roboto text-2xl`}>{onevone.title}</div>
            {/* make sure the text does not overflow */}
            <div className={`flex flex-col h-2/5 ${colorState.textcolor} align-top`}>{onevone.description.length > 200 ? discussion.description.substring(0, 200) + "..." : onevone.description}</div>
        </div>
        <div className="w-2/5">
            <div className="flex-col h-5/6 ">
                {/* TO_DO make sure these come from backend */}
                <div className={`flex justify-end items-center  ${colorState.captioncolor}`}><div className={`mr-3 ${colorState.textcolor}`} >duration:</div>{formatTime(onevone.duration)} </div>
   
                <div className={`flex justify-end items-center ${colorState.captioncolor}`}><div className={`mr-3 ${colorState.textcolor}`} >number of problems:</div> {onevone.num_of_problem}</div>            
            </div>
 
        </div>
    </div>

            </div>
        </div>
        <NewOneVOne colorState={colorState}  onClose={onClose} isOpen={isOpen} /> 
        <JoinOneVOne colorState={colorState}  onClose={onClose2} isOpen={isOpen2} /> 
        </div>
    );

};

export default OneVOne;

const KeyBoardInstruction = ({ colorState,OpenPopUp }) => {
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

const KeyBoardInstruction2 = ({ colorState,OpenPopUp }) => {
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

const NewOneVOne = ({ colorState,onClose,isOpen }) => {
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

    const [duration,setDuration] = useState(1)

    const handleChange3 = (event) => {
        setDuration(event.target.value);
    };

    const [numberOfProblem,setNumberOfProblem] = useState(1)

    const handleChange4 = (event) => {
        setNumberOfProblem(event.target.value);
    };


const Submit = () =>{
    axios.post(`http://127.0.0.1:8000/api/1-v-1/create/`,{
        title:title,
        description:description,
        duration:duration,
        num_of_problem: numberOfProblem,
      }).then((response) => {
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
                        onChange={handleChange2}  />
                    </div>

                    <div className="flex-col h-fit mb-8">
                        <div className={`font-roboto text-2xl ${colorState.textcolor2} mb-2`}>duration</div>
                        
                        <input className={`w-full  rounded-lg p-4 ${colorState.box1color}  font-roboto  ${colorState.textcolor}  text-2xl `}
                        value={duration}
                        type="number"
                        min={1}
                        onChange={handleChange3}  />
                    </div>

                    <div className="flex-col h-fit mb-8">
                        <div className={`font-roboto text-2xl ${colorState.textcolor2} mb-2`}>number of problem</div>
                        
                        <input className={`w-full  rounded-lg p-4 ${colorState.box1color}  font-roboto  ${colorState.textcolor}  text-2xl `}
                        value={numberOfProblem}
                        type="number"
                        min={1}
                        onChange={handleChange4}  />
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



const JoinOneVOne = ({ colorState,onClose,isOpen }) => {
    const handleClose = (e) => {
        if (e.target.classList.contains('overlay')) {
            onClose();
        }
    }

    const [key, setKey] = useState('');
    const handleChange1 = (event) => {
        setKey(event.target.value);
    };

const Submit = () =>{
    // axios.post(`http://127.0.0.1:8000/api/1-v-1/create/`,{
    //     title:title,
    //     description:description,
    //     duration:duration,
    //     num_of_problem: numberOfProblem,
    //   }).then((response) => {
    //     toast.success("One Vs One Created")
    // }).catch((error) => {
    //     console.error("Error fetching data:", error);
    // });
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
                     <div className={`${colorState.box1color} ${colorState.textcolor} py-2 px-3 rounded-md hover:bg-gray-400`} onClick={Submit}> Create New Contest</div>
                    </div>
                    
               </div>
            </div>
          </div>
          <ToastContainer />
        </>
      );
}







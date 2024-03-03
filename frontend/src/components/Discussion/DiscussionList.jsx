import { AuthContext } from "../helpers/AuthContext";
import { ColorContext } from "../helpers/ColorContext";
import { EnvVariableContext } from "../helpers/EnvVariableContext";
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

const DiscussionList = () => {
    const navigate = useNavigate();
    const [envVariables,setEnvVariables] = useContext(EnvVariableContext);
  
    const discussionIni = [
        {
            "id": 1,
            "title": "Is there a way in @pytorch of getting two sorted tensors of size Land generating in O(L) the sorted merged tensor?",
            "description": "Or even better, to get a Nx2xL where every tensor of size L is sorted and generate in O(L) a NxL tensor of the sorted top L of each merged pair?Or even better, to get a Nx2xL where every tensor of size L is sorted and generate in O(L) a NxL tensor of the sorted top L of each merged pair?Or even better, to get a Nx2xL where every tensor of size L is sorted and generate in O(L) a NxL tensor of the sorted top L of each merged pair?Or even better, to get a Nx2xL where every tensor of size L is sorted and generate in O(L) a NxL tensor of the sorted top L of each merged pair?",
            "created_at": "2024-02-20T18:34:37.590938Z",
            "is_resolved": true,
            "user": {
                "id": 3,
                "first_name": "test",
                "last_name": "user10"
            },
            "vote": 2,
            "user_vote": null
        },
        {
            "id": 1,
            "title": "Is there a way in @pytorch of getting two sorted tensors of size Land generating in O(L) the sorted merged tensor?",
            "description": "Or even better, to get a Nx2xL where every tensor of size L is sorted and generate in O(L) a NxL tensor of the sorted top L of each merged pair?Or even better, to get a Nx2xL where every tensor of size L is sorted and generate in O(L) a NxL tensor of the sorted top L of each merged pair?Or even better, to get a Nx2xL where every tensor of size L is sorted and generate in O(L) a NxL tensor of the sorted top L of each merged pair?Or even better, to get a Nx2xL where every tensor of size L is sorted and generate in O(L) a NxL tensor of the sorted top L of each merged pair?",
            "created_at": "2024-02-20T18:34:37.590938Z",
            "is_resolved": false,
            "user": {
                "id": 3,
                "first_name": "test",
                "last_name": "user10"
            },
            "vote": 5,
            "user_vote": null
        },
        {
            "id": 1,
            "title": "Is there a way in @pytorch of getting two sorted tensors of size Land generating in O(L) the sorted merged tensor?",
            "description": "Or even better, to get a Nx2xL where every tensor of size L is sorted and generate in O(L) a NxL tensor of the sorted top L of each merged pair?Or even better, to get a Nx2xL where every tensor of size L is sorted and generate in O(L) a NxL tensor of the sorted top L of each merged pair?Or even better, to get a Nx2xL where every tensor of size L is sorted and generate in O(L) a NxL tensor of the sorted top L of each merged pair?Or even better, to get a Nx2xL where every tensor of size L is sorted and generate in O(L) a NxL tensor of the sorted top L of each merged pair?",
            "created_at": "2024-02-20T18:34:37.590938Z",
            "is_resolved": false,
            "user": {
                "id": 3,
                "first_name": "test",
                "last_name": "user10"
            },
            "vote": 6,
            "user_vote": null
        },
    ]

    const [discussions,setDiscussions]=useState(discussionIni)

    useEffect(() => {
        axios.get(`${envVariables.backendDomain}api/discussion-forum/`)
            .then((response) => {
                setDiscussions(response.data);
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

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'n') {
                OpenPopUp();
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen]);

    const GoToDiscussion = (id) =>{
        navigate(`/Discussion/${id}`);
    }
 
    return (
        <div className="  h-5/6 flex flex-col">
            {
                (authState.loggedIn)&& <KeyBoardInstruction colorState={colorState} OpenPopUp={OpenPopUp} />
                         //   <OptionBar colorState={colorState} context={context} setContext={setContext} options={options} />
            }

            <div className=" h-full items-center overflow-y-auto">
            <div className="h-fit flex flex-col items-center ">

            {discussions.map((discussion, index) => (
    <div className="flex h-36 w-5/6 mb-8 cursor-pointer" key={index} onClick={()=>{GoToDiscussion(discussion.id)}}>
        <div className="w-4/5">
            <div className={`flex flex-col h-3/5 ${colorState.textcolor2} font-roboto text-2xl`}>{discussion.title}</div>
            {/* make sure the text does not overflow */}
            <div className={`flex flex-col h-2/5 ${colorState.textcolor} align-top`}>{discussion.description.length > 200 ? discussion.description.substring(0, 200) + "..." : discussion.description}</div>
        </div>
        <div className="w-1/5">
            <div className="flex-col h-5/6 ">
                {/* TO_DO make sure these come from backend */}
                <div className={`flex justify-end items-center  ${colorState.captioncolor}`}>{discussion.vote} votes</div>
                {
                    (discussion.is_resolved )? (
                        <div className={`flex justify-end items-center font-mono ${colorState.captioncolor}`}>
                            resolved 
                            <div className={`ml-3 bg-green-600 rounded-full w-5 h-5 flex justify-center items-center`}>
                                <IoMdCheckmark/>
                            </div>
                        </div>
                    ) : (
                        <div className={`flex justify-end items-center font-mono ${colorState.captioncolor}`}>
                            unresolved 
                            <div className={`ml-3 bg-red-600 rounded-full w-5 h-5 flex justify-center items-center`}>
                                <RxCross2/>
                            </div>
                        </div>
                    )
                }
                
            </div>
 
        </div>
    </div>
))}
            </div>
        </div>
        <NewProblem colorState={colorState}  onClose={onClose} isOpen={isOpen} /> 
        </div>
    );

};

export default DiscussionList;

const KeyBoardInstruction = ({ colorState,OpenPopUp }) => {
    return (
        <div className="flex justify-center h-8">
            <div className="text-4xl font-roboto font-bold">
                <div className={` flex items-center center h-full hover:bg-gray-400 p-1 rounded-md`} onClick={OpenPopUp}>
                    <div className={`${colorState.box1color} mr-2 py-1 px-2 items-center rounded-md ${colorState.textcolor} text-sm`}>n</div>
                    <p className={`${colorState.textcolor} text-sm`}>- Add New Discussion</p>
                </div>
            </div>
        </div>
    );
}


const OptionBar = ({ colorState, context, setContext, options }) => {
    return (
        <div className="flex h-8 my-4">
            <div className="flex justify-evenly w-full">
                {options.map((option, index) => {
                    return <Option colorState={colorState} context={context} setContext={setContext} option={option} key={index} />
                }
                )}
            </div>
        </div>
    );
}

const Option = ({ colorState, context, setContext, option }) => {
    return (
        <div className="flex h-full w-1/6 justify-center cursor-pointer" onClick={() => setContext({ ...context, "option": option })}>
            <p className={`${option === context.option ? colorState.textcolor2 : colorState.textcolor} text-base font-roboto`}>{option}</p>
        </div>
    );
}


//New Problem Addition-----------------------------

const NewProblem = ({ colorState,onClose,isOpen }) => {
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


const Submit = () =>{

    axios.post(`${envVariables.backendDomain}api/add-discussion/`,{
        title:title,
        description:description
      }).then((response) => {
        toast.success("Discussion Created")
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
              
              <div className={`${colorState.captioncolor} font-roboto text-4xl font-bold w-5/6 h-fit mb-12`}> add new discussion</div>

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
                    <div className={`flex justify-center`}>
                     <div className={`${colorState.box1color} ${colorState.textcolor} py-2 px-3 rounded-md hover:bg-gray-400`} onClick={Submit}> Submit New Discussion</div>
                    </div>
                    
    
    
               </div>
            </div>
          </div>
          <ToastContainer />
        </>
      );
}







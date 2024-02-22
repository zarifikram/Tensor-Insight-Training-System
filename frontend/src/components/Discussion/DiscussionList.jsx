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

const DiscussionList = () => {

  
    const discussions = [
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


    //const [context, setContext] = useState({ "option": "newest", newProblem: false, selectedProblem: -1, "problems": problems, "newProblemDetails": newProblemSchema }); // add more field as needed
    const [colorState, setColorState] = useContext(ColorContext);
    const [authState, setAuthState] = useContext(AuthContext);

    // useEffect(() => {
    //     const handleKeyDown = (event) => {
    //         if (event.key === 'n' && context.selectedProblem === -1) {
    //             setContext({ ...context, "newProblem": true });
    //         }

    //         if (event.shiftKey && event.key === 'Enter') {
    //             setContext({ ...context, "newProblem": false });
    //             // do your post request here
    //           }
    //     };

    //     const handleKeyUp = () => {
    //     };

    //     document.addEventListener('keydown', handleKeyDown);
    //     document.addEventListener('keyup', handleKeyUp);
    //     return () => {
    //         document.removeEventListener('keydown', handleKeyDown);
    //         document.removeEventListener('keyup', handleKeyUp);
    //     };
    // }, [context]);

    return (
        <div className="h-5/6 flex flex-col">
            {
                        //    <KeyBoardInstruction colorState={colorState} />
                         //   <OptionBar colorState={colorState} context={context} setContext={setContext} options={options} />
            }

            <div className=" h-full items-center overflow-y-auto">
            <div className="h-fit flex flex-col items-center ">

            {discussions.map((discussion, index) => (
    <div className="flex h-36 w-5/6 mb-8 cursor-pointer" key={index}>
        <div className="w-4/5">
            <div className="flex flex-col h-3/5 text-white font-roboto text-2xl">{discussion.title}</div>
            {/* make sure the text does not overflow */}
            <div className={`flex flex-col h-2/5 ${colorState.textcolor} align-top`}>{discussion.description.length > 200 ? discussion.description.substring(0, 200) + "..." : discussion.description}</div>
        </div>
        <div className="w-1/5">
            <div className="flex-col h-5/6 ">
                {/* TO_DO make sure these come from backend */}
                <div className={`flex justify-end items-center font-mono ${colorState.captioncolor}`}>{discussion.vote} votes</div>
                <div className={`flex justify-end items-center font-mono ${colorState.captioncolor}`}>1 answers</div>
                <div className={`flex justify-end items-center font-mono ${colorState.captioncolor}`}>5 solutions</div>
            </div>
            <div className="flex h-1/6">
                <div className={`flex w-full justify-end full ${colorState.textcolor} font-mono rounded-md`}>posted 49 mins ago   </div>
            </div>
        </div>
    </div>
))}
            </div>
        </div>
        </div>
    );

};

export default DiscussionList;

const KeyBoardInstruction = ({ colorState }) => {
    return (
        <div className="flex justify-center h-8">
            <div className="text-4xl font-roboto font-bold">
                <div className={` flex items-center center h-full`}>
                    <div className={`${colorState.box1color} mr-2 py-1 px-2 items-center rounded-md ${colorState.textcolor} text-sm`}>n</div>
                    <p className={`${colorState.textcolor} text-sm`}>- Add New Contest</p>
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



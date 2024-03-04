// Popup.js
import { AuthContext } from "../helpers/AuthContext";
import { ColorContext } from "../helpers/ColorContext";
import { EnvVariableContext } from "../helpers/EnvVariableContext";
import react,{ useContext } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ProblemSetProblemPopUp from "./ProblemSetProblemPopUp";
import { useRef } from "react";
import { CgArrowUpO } from "react-icons/cg";

import CodePane from "../CodePane";
import { RxCross2 } from "react-icons/rx";//<RxCross2/>
import { IoMdCheckmark } from "react-icons/io";//<IoMdCheckmark />

import { useState } from "react";
import DiscussionList from "./DiscussionList";
import { toast } from "react-toastify";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaClipboardQuestion } from "react-icons/fa6";
axios.defaults.withCredentials= true;

const Suggestion = () => {
    let {id} = useParams();
    const [envVariables,setEnvVariables] = useContext(EnvVariableContext);
    const [colorState,setColorState]= useContext(ColorContext);
    const [authState,setAuthState] = useContext(AuthContext);
    const iniSuggestions = [
        {
            "id": 99,
            "code": "print(\"hello world\")",
            "user": {
                "id": 7,
                "username": "saif"
            },
            "num_test_cases": 5,
            "num_test_cases_passed": 0,
            "test_case_verdict": {
                "0": {
                    "status": "success",
                    "output": "[[1, -3], [-1, -3]]",
                    "correct": false
                },
                "1": {
                    "status": "success",
                    "output": "[[-3, 5], [-1, 4]]",
                    "correct": false
                },
                "2": {
                    "status": "success",
                    "output": "[[3, -6], [2, -4]]",
                    "correct": false
                },
                "3": {
                    "status": "success",
                    "output": "[[5, -8], [9, -6]]",
                    "correct": false
                },
                "4": {
                    "status": "success",
                    "output": "[[-5, 2], [8, 1]]",
                    "correct": false
                }
            },
            "taken_time": 2,
            "timestamp": "2024-03-04T00:07:28.143595+06:00"
        },
        {
            "id": 86,
            "code": "o_tensor = torch.movedim(tensor, 0, 1)\ntensor = o_tensor\no_tensor = tensor[(slice(1, 2, None), slice(0, 1, None))]\ntensor = o_tensor\no_tensor = torch.split(tensor, 2, dim=1)[0]\ntensor = o_tensor\no_tensor=tensor.clone()\no_tensor[(slice(0, 1, None), slice(0, 1, None))] = torch.positive(o_tensor[(slice(0, 1, None), slice(0, 1, None))])\ntensor = o_tensor",
            "user": {
                "id": 7,
                "username": "saif"
            },
            "num_test_cases": 5,
            "num_test_cases_passed": 5,
            "test_case_verdict": {
                "0": {
                    "status": "success",
                    "output": "[[-3]]",
                    "correct": true
                },
                "1": {
                    "status": "success",
                    "output": "[[5]]",
                    "correct": true
                },
                "2": {
                    "status": "success",
                    "output": "[[-6]]",
                    "correct": true
                },
                "3": {
                    "status": "success",
                    "output": "[[-8]]",
                    "correct": true
                },
                "4": {
                    "status": "success",
                    "output": "[[2]]",
                    "correct": true
                }
            },
            "taken_time": 2,
            "timestamp": "2024-03-03T23:31:18.772202+06:00"
        },
        {
            "id": 86,
            "code": "o_tensor = torch.movedim(tensor, 0, 1)\ntensor = o_tensor\no_tensor = tensor[(slice(1, 2, None), slice(0, 1, None))]\ntensor = o_tensor\no_tensor = torch.split(tensor, 2, dim=1)[0]\ntensor = o_tensor\no_tensor=tensor.clone()\no_tensor[(slice(0, 1, None), slice(0, 1, None))] = torch.positive(o_tensor[(slice(0, 1, None), slice(0, 1, None))])\ntensor = o_tensor",
            "user": {
                "id": 7,
                "username": "saif"
            },
            "num_test_cases": 5,
            "num_test_cases_passed": 5,
            "test_case_verdict": {
                "0": {
                    "status": "success",
                    "output": "[[-3]]",
                    "correct": true
                },
                "1": {
                    "status": "success",
                    "output": "[[5]]",
                    "correct": true
                },
                "2": {
                    "status": "success",
                    "output": "[[-6]]",
                    "correct": true
                },
                "3": {
                    "status": "success",
                    "output": "[[-8]]",
                    "correct": true
                },
                "4": {
                    "status": "success",
                    "output": "[[2]]",
                    "correct": true
                }
            },
            "taken_time": 2,
            "timestamp": "2024-03-03T23:31:18.772202+06:00"
        },
        {
            "id": 86,
            "code": "o_tensor = torch.movedim(tensor, 0, 1)\ntensor = o_tensor\no_tensor = tensor[(slice(1, 2, None), slice(0, 1, None))]\ntensor = o_tensor\no_tensor = torch.split(tensor, 2, dim=1)[0]\ntensor = o_tensor\no_tensor=tensor.clone()\no_tensor[(slice(0, 1, None), slice(0, 1, None))] = torch.positive(o_tensor[(slice(0, 1, None), slice(0, 1, None))])\ntensor = o_tensor",
            "user": {
                "id": 7,
                "username": "saif"
            },
            "num_test_cases": 5,
            "num_test_cases_passed": 5,
            "test_case_verdict": {
                "0": {
                    "status": "success",
                    "output": "[[-3]]",
                    "correct": true
                },
                "1": {
                    "status": "success",
                    "output": "[[5]]",
                    "correct": true
                },
                "2": {
                    "status": "success",
                    "output": "[[-6]]",
                    "correct": true
                },
                "3": {
                    "status": "success",
                    "output": "[[-8]]",
                    "correct": true
                },
                "4": {
                    "status": "success",
                    "output": "[[2]]",
                    "correct": true
                }
            },
            "taken_time": 2,
            "timestamp": "2024-03-03T23:31:18.772202+06:00"
        },
        {
            "id": 86,
            "code": "o_tensor = torch.movedim(tensor, 0, 1)\ntensor = o_tensor\no_tensor = tensor[(slice(1, 2, None), slice(0, 1, None))]\ntensor = o_tensor\no_tensor = torch.split(tensor, 2, dim=1)[0]\ntensor = o_tensor\no_tensor=tensor.clone()\no_tensor[(slice(0, 1, None), slice(0, 1, None))] = torch.positive(o_tensor[(slice(0, 1, None), slice(0, 1, None))])\ntensor = o_tensor",
            "user": {
                "id": 7,
                "username": "saif"
            },
            "num_test_cases": 5,
            "num_test_cases_passed": 5,
            "test_case_verdict": {
                "0": {
                    "status": "success",
                    "output": "[[-3]]",
                    "correct": true
                },
                "1": {
                    "status": "success",
                    "output": "[[5]]",
                    "correct": true
                },
                "2": {
                    "status": "success",
                    "output": "[[-6]]",
                    "correct": true
                },
                "3": {
                    "status": "success",
                    "output": "[[-8]]",
                    "correct": true
                },
                "4": {
                    "status": "success",
                    "output": "[[2]]",
                    "correct": true
                }
            },
            "taken_time": 2,
            "timestamp": "2024-03-03T23:31:18.772202+06:00"
        }
    ];
    const [suggestions,setSuggestions]=useState(iniSuggestions);

    // useEffect(() => {
    //     axios.get(`${envVariables.backendDomain}api/problem/${id}/submission-list/`)
    //     .then((response) => {
    //     console.log(response.data);
    //     setSuggestions(response.data);
    //     }).catch((error) => {
    //         console.error("Error fetching data:", error);
    //     });
    //   }, [id]);

    return (
    <div className={`mx-40 ${colorState.textcolor2} font-roboto`}>
     <div className={`font-bold text-2xl py-10 ${colorState.captioncolor} flex`} >code suggestions from other users for problem <div  className={`ml-2`}>{id}</div></div>
     <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {suggestions.map((item, index) => (
        <div key={index} className={`${colorState.box1color} rounded-lg p-6`}>
          <h2 className="text-xl font-semibold">{item.user.username}</h2>
          <p className={`mt-2 ${colorState.textcolor}`}>{item.code}</p>
        </div>
      ))}
    </div>

    </div>
  );
};

export default Suggestion;

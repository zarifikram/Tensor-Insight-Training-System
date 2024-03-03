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

const Problem = () => {
  let {id} = useParams();
  const codeRef = useRef();
  const [envVariables,setEnvVariables] = useContext(EnvVariableContext);

  const iniPage =[
    {
      inputTensor: "",
      expectedTensor: "",
      currentTensor: "",
      reached:false
    },
    {
      inputTensor: "",
      expectedTensor: "",
      currentTensor: "",
      reached:false
    },
    {
      inputTensor: "",
      expectedTensor: "",
      currentTensor: "",
      reached:false
    },
    {
      inputTensor: "",
      expectedTensor: "",
      currentTensor: "",
      reached:false
    },
    {
      inputTensor: "",
      expectedTensor: "",
      currentTensor: "",
      reached:false
    },
  ]

    const [colorState,setColorState]= useContext(ColorContext);
    const [authState,setAuthState] = useContext(AuthContext);
    const [problem,setProblem] = useState({
        "id": 1,
        "title": "Untitled",
        "description": "No description",
        "difficulty": "2.40",
        "used_manipulator": "[\"movedim\"]",
        "solve_count": 1,
        "try_count": 1,
        "addedAt": "2024-01-27T07:39:59.242438Z",
        "test_cases": [
            {
                "input": "[[[1, 1, 1, 1, 1], [1, 1, 1, 1, 1], [1, 1, 1, 1, 1], [1, 1, 1, 1, 1]], [[1, 1, 1, 1, 1], [1, 1, 1, 1, 1], [1, 1, 1, 1, 1], [1, 1, 1, 1, 1]], [[1, 1, 1, 1, 1], [1, 1, 1, 1, 1], [1, 1, 1, 1, 1], [1, 1, 1, 1, 1]], [[1, 1, 1, 1, 1], [1, 1, 1, 1, 1], [1, 1, 1, 1, 1], [1, 1, 1, 1, 1]], [[1, 1, 1, 1, 1], [1, 1, 1, 1, 1], [1, 1, 1, 1, 1], [1, 1, 1, 1, 1]]]",
                "output": "[[[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]], [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]], [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]], [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]], [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]]]",
                "test_case_no": 1
            },
            {
                "input": "[[[7, 4, -3, 6, 8], [-3, 5, 6, 5, -9], [-4, -6, -4, -9, 6], [7, 8, 0, -6, 5]], [[-7, -6, -5, -4, 6], [0, 1, 0, -3, -8], [-9, -1, 6, -2, -9], [-7, 2, -5, -5, -10]], [[9, -3, 8, -10, -1], [-9, 2, -1, 7, -10], [-3, -3, 8, 0, 1], [1, -4, -1, -2, -2]], [[2, 2, -1, 6, 1], [5, -3, -1, 6, -1], [2, -9, -10, 2, -8], [6, 6, 9, -1, 5]], [[8, 9, 8, -8, -4], [1, -2, -9, 4, -10], [2, 2, 2, -7, -2], [-5, 7, -2, 1, -9]]]",
                "output": "[[[7, -3, -4, 7], [-7, 0, -9, -7], [9, -9, -3, 1], [2, 5, 2, 6], [8, 1, 2, -5]], [[4, 5, -6, 8], [-6, 1, -1, 2], [-3, 2, -3, -4], [2, -3, -9, 6], [9, -2, 2, 7]], [[-3, 6, -4, 0], [-5, 0, 6, -5], [8, -1, 8, -1], [-1, -1, -10, 9], [8, -9, 2, -2]], [[6, 5, -9, -6], [-4, -3, -2, -5], [-10, 7, 0, -2], [6, 6, 2, -1], [-8, 4, -7, 1]], [[8, -9, 6, 5], [6, -8, -9, -10], [-1, -10, 1, -2], [1, -1, -8, 5], [-4, -10, -2, -9]]]",
                "test_case_no": 2
            },
            {
                "input": "[[[4, 5, 6, -1, -7], [0, 6, 4, -4, -9], [-6, -10, -10, -1, -6], [6, -4, -4, 6, 2]], [[3, -6, -5, -7, -10], [5, 6, 2, 5, -5], [-7, 1, 0, -8, -5], [3, -3, 9, -3, -9]], [[1, -7, -1, -5, -8], [-3, -1, -10, 4, -3], [9, -6, 0, 3, -10], [-3, -2, -2, 9, -5]], [[-2, 6, -10, -9, -9], [-9, -9, -6, -1, -8], [-8, 7, -9, -1, 3], [-3, 8, 4, 8, -7]], [[-8, -5, 7, -1, -6], [5, 2, 3, 2, 0], [-10, -10, 6, 8, 7], [-8, 0, 3, 6, -10]]]",
                "output": "[[[4, 0, -6, 6], [3, 5, -7, 3], [1, -3, 9, -3], [-2, -9, -8, -3], [-8, 5, -10, -8]], [[5, 6, -10, -4], [-6, 6, 1, -3], [-7, -1, -6, -2], [6, -9, 7, 8], [-5, 2, -10, 0]], [[6, 4, -10, -4], [-5, 2, 0, 9], [-1, -10, 0, -2], [-10, -6, -9, 4], [7, 3, 6, 3]], [[-1, -4, -1, 6], [-7, 5, -8, -3], [-5, 4, 3, 9], [-9, -1, -1, 8], [-1, 2, 8, 6]], [[-7, -9, -6, 2], [-10, -5, -5, -9], [-8, -3, -10, -5], [-9, -8, 3, -7], [-6, 0, 7, -10]]]",
                "test_case_no": 3
            },
            {
                "input": "[[[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]], [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]], [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]], [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]], [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]]]",
                "output": "[[[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]], [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]], [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]], [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]], [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]]",
                "test_case_no": 4
            },
            {
                "input": "[[[4, 2, 0, -5, 7], [-1, -2, 4, -2, 2], [-6, -4, -9, 3, 9], [-1, -5, -9, 7, 2]], [[-7, 9, -9, 9, 3], [5, 2, -8, -2, -3], [6, -5, -8, -2, 1], [0, 4, 7, 4, 2]], [[3, -6, 0, 4, 0], [-9, 3, -8, 4, 2], [9, -5, 8, -9, -6], [5, -7, -2, -2, -9]], [[-6, 3, 3, -10, 4], [-10, 1, -8, 3, 2], [-5, -6, 2, 6, 8], [3, -1, 0, 6, -6]], [[-7, -6, 1, 6, 9], [-2, -8, -6, 6, 2], [-8, -5, 1, -1, -10], [-8, 8, 2, 3, 0]]]",
                "output": "[[[4, -1, -6, -1], [-7, 5, 6, 0], [3, -9, 9, 5], [-6, -10, -5, 3], [-7, -2, -8, -8]], [[2, -2, -4, -5], [9, 2, -5, 4], [-6, 3, -5, -7], [3, 1, -6, -1], [-6, -8, -5, 8]], [[0, 4, -9, -9], [-9, -8, -8, 7], [0, -8, 8, -2], [3, -8, 2, 0], [1, -6, 1, 2]], [[-5, -2, 3, 7], [9, -2, -2, 4], [4, 4, -9, -2], [-10, 3, 6, 6], [6, 6, -1, 3]], [[7, 2, 9, 2], [3, -3, 1, 2], [0, 2, -6, -9], [4, 2, 8, -6], [9, 2, -10, 0]]]",
                "test_case_no": 5
            }
        ],
        "solution": "o_tensor = torch.movedim(tensor, 2, 0)\ntensor = o_tensor\n",
        "editorial_image": null,
        "show_code": true,
        "depth": 1,
        "is_user_added": false
    })

    const [pages,setPages] = useState(iniPage)

  const handleCodeChange = (newCode) => {
    codeRef.current = newCode;
  };

  const [isPopupOpen, setPopupOpen] = useState(false);
  const [currentPage,setCurrentPage] = useState(0);
  

  const openPopup = (page) => {
      console.log("pop");
      setPopupOpen(true);
      setCurrentPage(page);
  };
  
  const closePopup = () => {
      setPopupOpen(false);
  };

    useEffect(() => {
        console.log("ret")
        axios.get(`${envVariables.backendDomain}api/problem/${id}/`)
        .then((response) => {
        console.log(response.data);
        setProblem(response.data)
          const test_cases = response.data.test_cases
        for (let i = 0; i < test_cases.length; i++) {
          //console.log(test_cases[i]);
          let temp = pages;
          temp[i].inputTensor=(JSON.stringify(test_cases[i].input)).slice(1, -1);
          temp[i].expectedTensor=(JSON.stringify(test_cases[i].output)).slice(1, -1);
          temp[i].currentTensor=(JSON.stringify(test_cases[i].input)).slice(1, -1);
          console.log(JSON.stringify(test_cases[i].input));
          setPages(temp);
        }

        }).catch((error) => {
            console.error("Error fetching data:", error);
        });
      }, [id]);



      useEffect(() => {
        const handleKeyPress = (event) => {
          if (event.shiftKey && event.ctrlKey ) {
            console.log("Shift + ctrlKey");
            let test_cases=[];
            for (let i = 0; i < pages.length; i++) {
              const input = pages[i].inputTensor;
              const output = pages[i].expectedTensor;
              const test_case_no = i + 1; // Adjust the logic based on your requirements
              // Create a JSON object and push it to the 'temp' array
              test_cases.push({
                input: input,
                output: output,
                test_case_no: test_case_no
              });
            }
            console.log(test_cases);
            //o_tensor = torch.where(tensor == 2, 100, -1)
            //tensor = o_tensor
            //const singleStringCode = codeRef.current.replace(/\n/g, "\\n");
            const singleStringCode = codeRef.current
            console.log(singleStringCode);
             axios.post(`${envVariables.backendDomain}api/run-problem/`,{
              test_cases:test_cases,code:singleStringCode
            }).then((response) => {
              console.log("```")
              console.log(response.data);
              for (let i = 0; i < 5; i++) {
                console.log(response.data.result[i])
                let temp = pages;
                if(response.data.result[i].status=="success"){
                  temp[i].currentTensor = response.data.result[i].output;
                  temp[i].reached = response.data.result[i].correct
                }
                setPages(pages);
              }
              
              let isCorrect = true;
              for (let i = 0; i < 5; i++) {
                if(temp[i].reached===false)
                  isCorrect=false
              }

              if(isCorrect){
                toast.success("Problem Solved!")
              }
              
            })
            .catch((error) => {
              console.error("Error fetching data:", error);
            });
          }
        };
    
        // Add the event listener when the component mounts
        window.addEventListener("keydown", handleKeyPress);
    
        // Remove the event listener when the component unmounts
        return () => {
          window.removeEventListener("keydown", handleKeyPress);
        };
      }, []); // Empty dependency array ensures that this effect runs only once when the component mounts
    
      const submitAnswer=()=>{
        axios.post(`${envVariables.backendDomain}api/problem/${id}/submit/`,{
          code:codeRef.current,
          taken_time:2
        }).then((response) => {
          console.log(response.data)
          console.log("toast time")
          const received_result = JSON.parse(response.data);
          console.log(received_result);
          if((received_result.result[0].correct &&
            received_result.result[1].correct &&
            received_result.result[2].correct &&
            received_result.result[3].correct &&
            received_result.result[4].correct)){//Debug mode always true
              toast.success("seccessfully submited");
            }else{
              toast.error("Some Test Cases Didn't Match")
            }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });

      }


    return (
<div className={`mx-40 ${colorState.textcolor2} font-roboto`}>
        <div className={`flex justify-start items-end`}>
          <div className={`py-2 px-3 text-2xl`}>{problem.id}</div>
          <div className={`py-2 px-3`}>{problem.title}</div>
          <div className={`py-2 px-3 ${colorState.textcolor}`}>difficulty:   {problem.difficulty}</div>
        </div>
        <div className={`py-2 px-3 flex justify-start`}>
          <div >Manipulators:</div>
          <div className={ `pl-3 ${colorState.textcolor}`}>{problem.used_manipulator}</div>
        </div>
        <div className={`py-2 px-3`}>
          <div>Description:</div>
          <div className={`${colorState.textcolor}`}>{problem.description}</div>
        </div>

        <div className={`py-2 px-3`}>
          <div>Test Cases:</div>
        </div>
        <div className=" h-24 flex justify-center py-4 items-center">
        <div onClick={()=>{}} className={ `hover:bg-gray-400 mr-3 ${colorState.box1color} w-16  h-16 rounded-full font-bold text-2xl flex  ${colorState.textcolor} justify-center items-center`}><FaClipboardQuestion /></div>
        <div className={` ${colorState.box1color}  w-40% rounded-full font-bold text-2xl flex justify-evenly py-5 text-gray-700`}>
                <div className={`${pages[0].reached?`bg-green-600 rounded-full hover:cursor-pointer`:`bg-red-600 rounded-full hover:cursor-pointer`}`}  onClick={()=>openPopup(0)}>
                  <div className={`${pages[0].reached?``:`hidden invisible`}`}><IoMdCheckmark/></div>
                  <div className={`${pages[0].reached?`hidden invisible`:``}`}><RxCross2/></div>
                </div>
                <div className={`${pages[1].reached?`bg-green-600 rounded-full hover:cursor-pointer`:`bg-red-600 rounded-full hover:cursor-pointer`}`}  onClick={()=>openPopup(1)}>
                  <div className={`${pages[1].reached?``:`hidden invisible`}`}><IoMdCheckmark/></div>
                  <div className={`${pages[1].reached?`hidden invisible`:``}`}><RxCross2/></div>
                </div>
                <div className={`${pages[2].reached?`bg-green-600 rounded-full hover:cursor-pointer`:`bg-red-600 rounded-full hover:cursor-pointer`}`}  onClick={()=>openPopup(2)}>
                  <div className={`${pages[2].reached?``:`hidden invisible`}`}><IoMdCheckmark/></div>
                  <div className={`${pages[2].reached?`hidden invisible`:``}`}><RxCross2/></div>
                </div>
                <div className={`${pages[3].reached?`bg-green-600 rounded-full hover:cursor-pointer`:`bg-red-600 rounded-full hover:cursor-pointer`}`}  onClick={()=>openPopup(3)}>
                  <div className={`${pages[3].reached?``:`hidden invisible`}`}><IoMdCheckmark/></div>
                  <div className={`${pages[3].reached?`hidden invisible`:``}`}><RxCross2/></div>
                </div>
                <div className={`${pages[4].reached?`bg-green-600 rounded-full hover:cursor-pointer`:`bg-red-600 rounded-full hover:cursor-pointer`}`}  onClick={()=>openPopup(4)}>
                  <div className={`${pages[4].reached?``:`hidden invisible`}`}><IoMdCheckmark/></div>
                  <div className={`${pages[4].reached?`hidden invisible`:``}`}><RxCross2/></div>
                </div>

            </div>
            <div onClick={submitAnswer} className={ `hover:bg-gray-400 ml-3 ${colorState.box1color} w-16  h-16 rounded-full font-bold text-2xl flex  ${colorState.textcolor} justify-center items-center`}><CgArrowUpO /></div>
        </div>
        <CodePane  onCodeChange={handleCodeChange} />
        <div className=" flex justify-center text-2xl font-bold py-5"> Comments</div>
        <DiscussionList id={id}></DiscussionList>
        {
            <ProblemSetProblemPopUp isOpen={isPopupOpen} onClose={closePopup} currentPage={currentPage} setCurrentPage={setCurrentPage} pages={pages} problem={problem}/>
        }
        {
            <ToastContainer />
        }
    </div>
  );
};

export default Problem;

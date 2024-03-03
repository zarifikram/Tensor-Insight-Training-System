import { AuthContext } from "../helpers/AuthContext";
import { ColorContext } from "../helpers/ColorContext";
import React, { useContext } from "react";
import { useState } from "react";
//import { useRef } from "react";
import { EnvVariableContext } from "../helpers/EnvVariableContext";

import CodePane from "../CodePane";
import { RxCross2 } from "react-icons/rx";//<RxCross2/>
import { IoMdCheckmark } from "react-icons/io";//<IoMdCheckmark />

import ContestProblemPopUp from "./ContestProblemPopUp";
import axios from 'axios';
import { useEffect } from "react";

import { useRef } from "react";
import { CgArrowUpO } from "react-icons/cg";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';
import { FaStop } from "react-icons/fa6";

import { useParams } from "react-router";

   


const ContestProblem = () =>{
    let {  contestId,problemId } = useParams();



    const [colorState,setColorState]= useContext(ColorContext);
    const [authState,setAuthState] = useContext(AuthContext);
    const [envVariables,setEnvVariables] = useContext(EnvVariableContext);
    const codeRef = useRef();



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

    const [pages,setPages] = useState(iniPage);
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [isTimeSelecetionPopupOpen, setTimeSelecetionPopupOpen] = useState(true);
    const [currentPage,setCurrentPage] = useState(0);
   // const codeRef = useRef();

   const openPopup = (page) => {
    setPopupOpen(true);
    setCurrentPage(page);
    };

    const closePopup = () => {
        setPopupOpen(false);
    };
    const handleCodeChange = (newCode) => {
        codeRef.current = newCode;
      };


      useEffect(() => {
      axios.get(`http://127.0.0.1:8000/api/contest/${contestId}/problem/${problemId}/`)
      .then((response) => {
      console.log(response.data);
      const test_cases = response.data.test_cases;
      for (let i = 0; i < test_cases.length; i++) {
        //console.log(test_cases[i]);
        let temp = pages;
        temp[i].inputTensor=(JSON.stringify(test_cases[i].input)).slice(1, -1);
        temp[i].expectedTensor=(JSON.stringify(test_cases[i].output)).slice(1, -1);
        temp[i].currentTensor=(JSON.stringify(test_cases[i].input)).slice(1, -1);
       // console.log(JSON.stringify(test_cases[i].input));
        setPages(temp);
      }
      console.log(pages);
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
        });
        }, []);



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
                 axios.post("http://127.0.0.1:8000/api/run-problem/",{
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
            axios.post(`http://127.0.0.1:8000/api/contest/${contestId}/problem/${problemId}/submit/`,{
              code:codeRef.current,
              taken_time:2
            }).then((response) => {
              console.log(response.data)
              //toast.success("seccessfully submited");
              const received_result = JSON.parse(response.data);
              console.log(received_result);
              if((received_result.result[0].correct &&
                received_result.result[1].correct &&
                received_result.result[2].correct &&
                received_result.result[3].correct &&
                received_result.result[4].correct)){//Debug mode
                  console.log("success")
                }
            })
            .catch((error) => {
              console.error("Error fetching data:", error);
            });
             // toast.success("Congraulations! You have completed  Problems");
              }
      
    

    return(
    <div className="mx-40">
        <div className=" h-24 flex justify-center py-4 items-center">
           
            {
           // <div onClick={forceEnd} className={ `${(authState.QuantityModeRunning<1)?``:`hover:bg-gray-400 mr-3 ${colorState.box1color} w-16  h-16 rounded-full font-bold text-2xl flex  text-gray-700 justify-center items-center`}`}><FaStop className={`${(authState.QuantityModeRunning<1)?`hidden`:``}`} /></div>
        
        }
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
            {
            <div onClick={submitAnswer} className={ `hover:bg-gray-400 ml-3 ${colorState.box1color} w-16  h-16 rounded-full font-bold text-2xl flex  text-gray-700 justify-center items-center`}><CgArrowUpO /></div>
        }
        </div>
        <div className={`pt-20 ${colorState.textcolor2} font-roboto text-2xl font-bold`}>{authState.QuantityModeRunning}</div>
        <CodePane  onCodeChange={handleCodeChange} />
        <div className={`flex justify-center`}>
          <div className={` flex items-center`}>
            <div className={`${colorState.box1color} mr-2 py-1 px-2 items-center rounded-md ${colorState.textcolor}`}>shift</div>
            <p className={`${colorState.textcolor}`}>+</p>
            <div className={`${colorState.box1color} mx-2 py-1 px-2 items-center rounded-md ${colorState.textcolor}`}>ctrl</div>
            <p className={`${colorState.textcolor}`}>- Run</p>
          </div>
        </div>
        {
            <ContestProblemPopUp isOpen={isPopupOpen} onClose={closePopup} currentPage={currentPage} setCurrentPage={setCurrentPage} pages={pages}/>
        }
    </div>
    );
    
    };
    
    export default ContestProblem;
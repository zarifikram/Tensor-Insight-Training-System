import { AuthContext } from "../helpers/AuthContext";
import { ColorContext } from "../helpers/ColorContext";
import React, { useContext } from "react";
import { useState } from "react";
import QuantityModeLeaderBoardPopUp from "./QuantityModeLeaderBoardPopUp";
import { MdLeaderboard } from "react-icons/md";

import CodePane from "../CodePane";
import { RxCross2 } from "react-icons/rx";//<RxCross2/>
import { IoMdCheckmark } from "react-icons/io";//<IoMdCheckmark />

import QuantityModePopUp from "./QuantityModePopUp";
import QuantitySelectionPopUp from "./QuantitySelectionPopUp";
import axios from 'axios';
import { useEffect } from "react";

import { useRef } from "react";
import { CgArrowUpO } from "react-icons/cg";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Cookies from 'js-cookie';
import { FaStop } from "react-icons/fa6";

const QuantityMode = () =>{
  //*Initialization useStates:---------------------------------------------------------------
  const [colorState,setColorState]= useContext(ColorContext);
  const [authState,setAuthState] = useContext(AuthContext);
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

  const [pages,setPages] = useState(iniPage)

  //*Leaderboard Popup----------------------------------------------------------------------
  const [isLeaderBoardPopupOpen, setLeaderBoardPopupOpen] = useState(false);
  const openLeaderBoardPopup = () => {
    setLeaderBoardPopupOpen(true);
  };
  const closeLeaderBoardPopup = () => {
    setLeaderBoardPopupOpen(false);
  };
      
  //*Problem PopUp--------------------------------------------------------------------------
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [currentPage,setCurrentPage] = useState(0);
    
  const openPopup = (page) => {
      setPopupOpen(true);
      setCurrentPage(page);
  };
  
  const closePopup = () => {
      setPopupOpen(false);
  };

  //*Quantity Selection Popup-----------------------------------------------------------------
  const [quantity,setQuantity] = useState(10);
  const [isQuantitySelecetionPopupOpen,setQuantitySelecetionPopupOpen] = useState(true);

  const openTimeSelectionPopup = () => {;
    setQuantitySelecetionPopupOpen(true);
  };

  const closeQuantitySelectionPopUp =  () => {
    setQuantitySelecetionPopupOpen(false);
    getProblem();
  };

  const handleCodeChange = (newCode) => {
    codeRef.current = newCode;
  };

  //*Code Runner-------------------------------------------------------------------------
  useEffect(() => {
  const handleKeyPress = (event) => {
    if (event.shiftKey && event.ctrlKey ) {
      let test_cases=[];
      for (let i = 0; i < pages.length; i++) {
        const input = pages[i].inputTensor;
        const output = pages[i].expectedTensor;
        const test_case_no = i + 1;
        test_cases.push({
          input: input,
          output: output,
          test_case_no: test_case_no
        });
      }
      const singleStringCode = codeRef.current
      console.log(singleStringCode);
        axios.post("http://127.0.0.1:8000/api/run-problem/",{
        test_cases:test_cases,code:singleStringCode
      }).then((response) => {
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
  window.addEventListener("keydown", handleKeyPress);
  return () => {
    window.removeEventListener("keydown", handleKeyPress);
  };
  }, []); 

  //*Functions--------------------------------------------------------------------------
  const submitAnswer=()=>{
    axios.post("http://127.0.0.1:8000/api/quantity-mode/submit/",{
      code:codeRef.current,
      taken_time:2
    }).then((response) => {
      const received_result = JSON.parse(response.data);
      console.log(received_result);
      if((received_result.result[0].correct &&
        received_result.result[1].correct &&
        received_result.result[2].correct &&
        received_result.result[3].correct &&
        received_result.result[4].correct)){
          toast.success("All Test Cases Matched!")
        }else{
          toast.error("Some Test Cases Did Not Match")
        }
        if(authState.QuantityModeRunning===quantity){
          let q = authState.QuantityModeRunning
          setPages(iniPage);
          setAuthState(prevState => ({
            ...prevState,
            QuantityModeRunning: 0
          }));
          toast.success("Congraulations! You have completed all "+(q)+" Problems");
        }else{
          setAuthState(prevState => ({
            ...prevState,
            QuantityModeRunning: prevState.QuantityModeRunning + 1
          }));
          getProblem()
        }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
  }

  const getProblem = () =>{
    axios.get("http://127.0.0.1:8000/api/quantity-mode/")
    .then((response) => {
    const test_cases = response.data.current_problem.test_cases;
    for (let i = 0; i < test_cases.length; i++) {
      let temp = pages;
      temp[i].inputTensor=(JSON.stringify(test_cases[i].input)).slice(1, -1);
      temp[i].expectedTensor=(JSON.stringify(test_cases[i].output)).slice(1, -1);
      temp[i].currentTensor=(JSON.stringify(test_cases[i].input)).slice(1, -1);
      console.log(JSON.stringify(test_cases[i].input));
      temp[i].reached=false;
      setPages(temp);
    }
    console.log(pages);
    })
    .catch((error) => {
    console.error("Error fetching data:", error);
    });
  }

  const forceEnd = () =>{
    setAuthState(prevState => ({
      ...prevState,
      QuantityModeRunning: 0
    }));
    setPages(iniPage);
    submitAnswer();
    axios.post("http://127.0.0.1:8000/api/quantity-mode/force-end/")
    .then((response) => {
      toast.success("Quantity Mode Force Ended!");
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
  }

    return(
    <div className="mx-40">
        <div className={` h-24 flex justify-center py-4 items-center ${colorState.textcolor}`}>
        <div onClick={forceEnd} className={ `${(authState.QuantityModeRunning<1)?``:`hover:bg-gray-400 mr-3 ${colorState.box1color} w-16  h-16 rounded-full font-bold text-2xl flex justify-center items-center`}`}><FaStop className={`${(authState.QuantityModeRunning<1)?`hidden`:``}`} /></div>
            <div className={` ${colorState.box1color}  w-40% rounded-full font-bold text-2xl flex justify-evenly py-5 ${colorState.textcolor3}`}>
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
            <div onClick={submitAnswer} className={ `hover:bg-gray-400 ml-3 ${colorState.box1color} w-16  h-16 rounded-full font-bold text-2xl flex   justify-center items-center`}><CgArrowUpO /></div>
            <div onClick={openLeaderBoardPopup} className={`hover:bg-gray-400 ml-3 ${colorState.box1color}  w-16 h-16 rounded-full font-bold text-2xl flex   justify-center items-center`}><MdLeaderboard /></div>
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
          <QuantityModePopUp isOpen={isPopupOpen} onClose={closePopup} currentPage={currentPage} setCurrentPage={setCurrentPage} pages={pages}/>
        }
        {
          <QuantitySelectionPopUp isOpen={isQuantitySelecetionPopupOpen} onClose={closeQuantitySelectionPopUp} quantity={quantity} setQuantity={setQuantity} />
        }
        {
          <QuantityModeLeaderBoardPopUp isOpen={isLeaderBoardPopupOpen} onClose={closeLeaderBoardPopup}/>
        }
        {      
          <ToastContainer />       
        }
    </div>
    );
    
    };
    
    export default QuantityMode;
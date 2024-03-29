import { AuthContext } from "../helpers/AuthContext";
import { ColorContext } from "../helpers/ColorContext";
import { EnvVariableContext } from "../helpers/EnvVariableContext";
import { AiFillCaretRight } from "react-icons/ai";
import React, { useContext } from "react";
import { useState } from "react";
import { AiFillPauseCircle } from "react-icons/ai";
import { CgArrowUpO } from "react-icons/cg";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MdLeaderboard } from "react-icons/md";
import TimeModeLeaderBoardPopUp from "./TimeModeLeaderBoardPopUp";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Notification from "../Notifications";

import CodePane from "../CodePane";
import { RxCross2 } from "react-icons/rx";//<RxCross2/>
import { IoMdCheckmark } from "react-icons/io";//<IoMdCheckmark />
import LoadingScreen from "../Utility/LoadingScreen";

import TimeModePopUp from "./TimeModePopUp";
import TimeSelectionPopUp from "./TimeSelectionPopUp";
import axios from 'axios';
import { useEffect } from "react";
//import Cookies from 'js-cookie';

import { useRef } from "react";
axios.defaults.withCredentials= true;

const TimeMode = ({ mode, setMode,isTimeSelecetionPopupOpen,setTimeSelecetionPopupOpen,sendTime,setSendTime }) =>{
  const [showNotification, setShowNotification] = useState(false);
  const handleNotificationClose = () => {
    setShowNotification(false);
  };

  const showNotificationHandler = () => {
    setShowNotification(true);
  };

  const [showNotification2, setShowNotification2] = useState(false);
  const handleNotificationClose2 = () => {
    setShowNotification2(false);
  };

  const showNotificationHandler2 = () => {
    setShowNotification2(true);
  };

  const [showNotification3, setShowNotification3] = useState(false);
  const handleNotificationClose3 = () => {
    setShowNotification3(false);
  };

  const showNotificationHandler3 = () => {
    setShowNotification3(true);
  };

  //*Loading Screen--------------------------------------------------------------------------
  const [isLoading,setIsLoading] = useState(false);

  //*Initialization useStates:---------------------------------------------------------------
  const [colorState,setColorState]= useContext(ColorContext); //theme selection state
  const [authState,setAuthState] = useContext(AuthContext); //authentication state
  const [envVariables,setEnvVariables] = useContext(EnvVariableContext);
  const codeRef = useRef(); //code pane

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

  //*Initialization and Return Call:---------------------------------------------------------
  useEffect(() => {
    return () => {
      complete();
      setAuthState(prevState => ({
        ...prevState,
        timerModeRunning: 0,
      }));
    };
  }, []);

  //*Time Counter:--------------------------------------------------------------------------
  const delay = 1000
  const [time, setTime] = useState(0);
  const [running,setRunning] = useState(false);
  
  useEffect(() => {
    console.log(running)
    if(running){
      const intervalId = setInterval(() => {
        setTime(prevTime => {
          if(prevTime == sendTime){
            complete();
            run();
          }
          return prevTime + 1; 
        });
      }, delay); //delay for every call
      return () => clearInterval(intervalId);
    }
  }, [running]); 

  const hours = Math.floor((sendTime-time) / 3600);
  const minutes = Math.floor(((sendTime-time) % 3600) / 60);
  const seconds = (sendTime-time) % 60;

  const run = () => {
    if(!running){
      initializeTimeMode();
      setRunning(prevRunning => true);
    }else{
      setRunning(prevRunning => false);
      setTime(prevTime =>0);
    } 
  };
  
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

  //*Time Selection Popup-----------------------------------------------------------------

  const openTimeSelectionPopup = () => {
    setTimeSelecetionPopupOpen(true);
  };

  const closeTimeSelectionPopup =  () => {
    setTimeSelecetionPopupOpen(false);
  };

  const handleCodeChange = (newCode) => {
    codeRef.current = newCode;
  };

  //*Create Time Mode---------------------------------------------------------------------
  const initializeTimeMode = () =>{ 
    axios.post(`${envVariables.backendDomain}api/time-mode/create/`,{time:sendTime})
    .then((response) => {
      console.log(response.data);
      setAuthState(prevState => ({
        ...prevState,
        timerModeRunning:1
      }));
      getProblem();
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
  }

  //*Functions--------------------------------------------------------------------------
  const getProblem = () =>{
    axios.get(`${envVariables.backendDomain}api/time-mode/`)
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
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
  }

  const submitAnswer=()=>{
    axios.post(`${envVariables.backendDomain}api/time-mode/submit/`,{
      code:codeRef.current,
      taken_time:time
    }).then((response) => {
      const received_result = JSON.parse(response.data);
      if(received_result.result[0].correct &&
        received_result.result[1].correct &&
        received_result.result[2].correct &&
        received_result.result[3].correct &&
        received_result.result[4].correct){
          //toast.success("All Test Cases Matched!")
          showNotificationHandler();
          console.log("All Test Cases Matched");
        }else{
          //toast.error("Some Test Cases Did Not Match")
          showNotificationHandler2();
        }  
        setAuthState(prevState => ({
          ...prevState,
          timerModeRunning: prevState.timerModeRunning + 1
        }));
        getProblem();
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
  }

  const complete = () =>{
    setAuthState(prevState => ({
      ...prevState,
      timerModeRunning:0
    }));
    axios.post(`${envVariables.backendDomain}api/time-mode/complete/`)
    .then((response) => {
      console.log(response.data)
      //toast.success("Time mode completed")
      showNotificationHandler3();
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
    setPages(iniPage);
  }

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
        axios.post(`${envVariables.backendDomain}api/run-problem/`,{
          test_cases:test_cases,code:singleStringCode
        }).then((response) => {
          for (let i = 0; i < 5; i++) {
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

  return(
  <div className="mx-40">
      <div className={` h-24 flex justify-center py-4 items-center ${colorState.textcolor}`}>
      <div className={ `hover:bg-gray-400 mr-3 ${colorState.box1color} px-5  h-16 rounded-full font-bold text-2xl flex  justify-center items-center`}>{hours.toString().padStart(2, '0')}:{minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}</div>
      <div className={`${running?`hidden`:``}`}>
      <div onClick={run} className={ `hover:bg-gray-400 mr-3 ${colorState.box1color} w-16  h-16 rounded-full font-bold text-2xl flex  justify-center items-center`}><AiFillCaretRight  /></div>
      </div>
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

      <div onClick={() => submitAnswer(false)} className={ `hover:bg-gray-400 ml-3 ${colorState.box1color} w-16  h-16 rounded-full font-bold text-2xl flex justify-center items-center`}><CgArrowUpO /></div>
      <div onClick={openLeaderBoardPopup} className={`hover:bg-gray-400 ml-3 ${colorState.box1color}  w-16 h-16 rounded-full font-bold text-2xl flex  justify-center items-center`}><MdLeaderboard /></div>
      
      </div>
      <div className={`pt-20 ${colorState.textcolor2} font-roboto text-2xl font-bold`}>{authState.timerModeRunning}</div>
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
        <TimeModePopUp isOpen={isPopupOpen} onClose={closePopup} currentPage={currentPage} setCurrentPage={setCurrentPage} pages={pages}/>
      }
      {
        <TimeSelectionPopUp isOpen={isTimeSelecetionPopupOpen} onClose={closeTimeSelectionPopup}  setSendTime={setSendTime}   mode={mode} setMode={setMode} />
      }
      {
        <TimeModeLeaderBoardPopUp isOpen={isLeaderBoardPopupOpen} onClose={closeLeaderBoardPopup}/>
      }
      {
        <LoadingScreen isLoading={isLoading} />
      }
        <Notification
        message="All Test Cases Matched!"
        onClose={handleNotificationClose}
        isVisible={showNotification}
        isSuccess={true}
      />
        <Notification
        message="Some Test Cases Did Not Match"
        onClose={handleNotificationClose2}
        isVisible={showNotification2}
        isSuccess={false}
      />
    <Notification
        message="Time Mode Completed"
        onClose={handleNotificationClose3}
        isVisible={showNotification3}
        isSuccess={true}
      />
  </div>
  );
}; 
export default TimeMode;
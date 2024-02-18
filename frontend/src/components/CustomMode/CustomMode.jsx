import { AuthContext } from "../helpers/AuthContext";
import { ColorContext } from "../helpers/ColorContext";
import { CSRFContext } from "../helpers/CSRFContext";
import React, { useContext } from "react";
import { useState } from "react";
import { IoMdSettings } from "react-icons/io";
import { MdRestartAlt } from "react-icons/md";
import { CgArrowUpO } from "react-icons/cg";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';


import CodePane from "../CodePane";
import { RxCross2 } from "react-icons/rx";//<RxCross2/>
import { IoMdCheckmark } from "react-icons/io";//<IoMdCheckmark />

import CustomSettingsPopUp from "./CustomSettingsPopUp";
import CustomModePopUp from "./CustomModePopUp";
import axios from 'axios';
import { useEffect } from "react";
import Cookies from 'js-cookie';
import { useRef } from "react";
axios.defaults.withCredentials = true;


const CustomMode = () =>{
  //page initialization
  const [ini,setIni] = useState(true)
  const [settings,setSettings] = useState({
    "depth": 2,
    "initiator": {
        "randint": false,
        "zeros": false,
        "ones": false,
        "arange": false
    },
    "manipulator": {
        "argwhere": false,
        "tensor_split": false,
        "gather": false,
        "masked_select": false,
        "movedim": false,
        "splicing": false,
        "t": false,
        "take": false,
        "tile": false,
        "unsqueeze": false,
        "negative": false,
        "positive": false,
        "where": false,
        "remainder": false,
        "clip": false,
        "argmax": false,
        "argmin": false,
        "sum": false,
        "unique": false
    }
})
  useEffect(() => {
    //set axios csrf header
    //axios.defaults.headers.common['X-CSRFToken'] = Cookies.get('csrf');
    //setting page for previous settings
    if(ini){
      setIni(false);
      
      axios.get("http://127.0.0.1:8000/api/custom-mode/setting/")
      .then((response) => {
      setSettings(response.data)
      }).catch((error) => {
      console.error("Error fetching data:", error);
      });
    }
  }, []);

    const [colorState,setColorState]= useContext(ColorContext);
    const [authState,setAuthState] = useContext(AuthContext);
    const codeRef = useRef();

    const [pages,setPages] = useState([
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
      ])

  
    //Popup--------------------------------------------
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [isTimeSelecetionPopupOpen, setSettingsSelectionPopUpOpen] = useState(false);
    const [currentPage,setCurrentPage] = useState(0);
    

    const openPopup = (page) => {
        setPopupOpen(true);
        setCurrentPage(page);
    };
    
    const closePopup = () => {
        setPopupOpen(false);
    };

    const openSettingsSelectionPopUp = () => {
        setSettingsSelectionPopUpOpen(true);
    };

    const handleCodeChange = (newCode) => {
      codeRef.current = newCode;
    };

    const closeSettingsSelectionPopUp =  () => {
      console.log("=================================================")
      console.log(authState.loggedIn);
        setSettingsSelectionPopUpOpen(false);

        axios.post("http://127.0.0.1:8000/api/custom-mode/setting/",{
          depth:settings.depth,
          initiator:settings.initiator,
          manipulator:settings.manipulator
        }).then((response) => {
          console.log("settings set up")
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });


        console.log(authState.loggedIn);
        if(authState.loggedIn){
            axios.get("http://127.0.0.1:8000/api/custom-mode/")
            .then((response) => {
              console.log(response.data)
            const test_cases = response.data.test_cases;
            for (let i = 0; i < test_cases.length; i++) {
              let temp = pages;
              temp[i].inputTensor=test_cases[i].input;
              temp[i].expectedTensor=test_cases[i].output;
              temp[i].currentTensor=test_cases[i].input;
              setPages(temp);
            }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
        }else{
          axios.get("http://127.0.0.1:8000/api/custom-mode/")
          .then((response) => {
          const test_cases = JSON.parse(response.data.test_cases);
          for (let i = 0; i < test_cases.length; i++) {
            let temp = pages;
            temp[i].inputTensor=JSON.stringify(test_cases[i].input);
            temp[i].expectedTensor=JSON.stringify(test_cases[i].output);
            temp[i].currentTensor=JSON.stringify(test_cases[i].input);
            temp[i].reached=false;
            setPages(temp);
          }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
        }

        console.log(pages)

    };

     useEffect(() => {
    const handleKeyPress = (event) => {

      if (event.shiftKey && event.ctrlKey ) {
        console.log("Shift + ctrlKey");
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
            setPages(temp);
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

  //Custom-Settings--------------------------------------
  
  const submitAnswer=()=>{
    axios.post("http://127.0.0.1:8000/api/custom-mode/submit/",{
      code:codeRef.current,
      taken_time:2
    }).then((response) => {
      console.log(response.data)
      console.log("toast time")
      toast.success("seccessfully submited");
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
  }

    return(
    <div className="mx-40">
        <div className=" h-24 flex justify-center py-4 items-center">
          <div onClick={submitAnswer} className={ `${authState.loggedIn?`hover:bg-gray-400 mr-3 ${colorState.box1color}  w-16 h-16 rounded-full font-bold text-2xl flex  text-gray-700 justify-center items-center`:`invisible`}   `}><CgArrowUpO /></div>
        <div onClick={closeSettingsSelectionPopUp} className={`${authState.loggedIn?`invisible`:`hover:bg-gray-400 mr-3 ${colorState.box1color}  w-16 h-16 rounded-full font-bold text-2xl flex  text-gray-700 justify-center items-center`}`}><MdRestartAlt /></div>
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
            <div onClick={openSettingsSelectionPopUp} className={`hover:bg-gray-400 ml-3 ${colorState.box1color}  w-16 h-16 rounded-full font-bold text-2xl flex  text-gray-700 justify-center items-center`}><IoMdSettings/></div>
        </div>
        <div className={`pt-20 ${colorState.textcolor2} font-roboto text-2xl font-bold`}></div>
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
            <CustomModePopUp isOpen={isPopupOpen} onClose={closePopup} currentPage={currentPage} setCurrentPage={setCurrentPage} pages={pages}/>
        }
                {
            <CustomSettingsPopUp isOpen={isTimeSelecetionPopupOpen} onClose={closeSettingsSelectionPopUp} settings={settings} setSettings={setSettings} />
        }
         <ToastContainer />
    </div>
    );
    
    };
    
    export default CustomMode;
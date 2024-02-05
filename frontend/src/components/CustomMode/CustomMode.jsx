import { AuthContext } from "../helpers/AuthContext";
import { ColorContext } from "../helpers/ColorContext";
import { CSRFContext } from "../helpers/CSRFContext";
import React, { useContext } from "react";
import { useState } from "react";
import { IoMdSettings } from "react-icons/io";
import { MdRestartAlt } from "react-icons/md";
import { toast } from 'react-toastify';

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
// axios.defaults.headers.common['X-CSRFToken'] = csrfToken

// const setCSRFToken = () => {
//   axios.get('http://127.0.0.1:8000/api/get-csrftoken/')
//   .then(response => {
//     const csrfToken = response.data.csrftoken;
//     console.log(csrfToken);
//     axios.defaults.headers.common['X-CSRFToken'] = csrfToken;
//   })
//   .catch(error => {
//     console.error('Error fetching CSRF token:', error);
//   });
// };
// setCSRFToken();

const CustomMode = () =>{

  useEffect(() => {
      console.log(Cookies.get('csrf'))
    axios.defaults.headers.common['X-CSRFToken'] = Cookies.get('csrf');
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
    const [isTimeSelecetionPopupOpen, setTimeSelecetionPopupOpen] = useState(false);
    const [currentPage,setCurrentPage] = useState(0);
    

    const openPopup = (page) => {
        console.log("pop");
        setPopupOpen(true);
        setCurrentPage(page);
    };
    
    const closePopup = () => {
        setPopupOpen(false);
    };

    const openTimeSelectionPopup = () => {
        console.log("pop");
        setTimeSelecetionPopupOpen(true);
    };

    const handleCodeChange = (newCode) => {
      codeRef.current = newCode;
    };

    const closeTimeSelectionPopup =  () => {
        setTimeSelecetionPopupOpen(false);

        console.log(authState.loggedIn);
        if(authState.loggedIn){
            axios.get("http://127.0.0.1:8000/api/custom-mode/")
            .then((response) => {
            console.log(response.data);
            const test_cases = response.data.test_cases;
            for (let i = 0; i < test_cases.length; i++) {
              //console.log(test_cases[i]);
              let temp = pages;
              temp[i].inputTensor=JSON.stringify(test_cases[i].input);
              temp[i].expectedTensor=JSON.stringify(test_cases[i].output);
              temp[i].currentTensor=JSON.stringify(test_cases[i].input);
              console.log(JSON.stringify(test_cases[i].input));
              setPages(temp);
            }
            console.log(pages);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
        }else{
          axios.get("http://127.0.0.1:8000/api/custom-mode/")
          .then((response) => {
          console.log(response.data);
          const test_cases = JSON.parse(response.data.test_cases);
          for (let i = 0; i < test_cases.length; i++) {
            //console.log(test_cases[i]);
            let temp = pages;
            temp[i].inputTensor=JSON.stringify(test_cases[i].input);
            temp[i].expectedTensor=JSON.stringify(test_cases[i].output);
            temp[i].currentTensor=JSON.stringify(test_cases[i].input);
            temp[i].reached=false;
            console.log(JSON.stringify(test_cases[i].input));
            setPages(temp);
          }
          console.log(pages);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
        }

    };

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
            setPages(temp);
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

    //-------------------------------------------------

    return(
    <div className="mx-40">
        <div className=" h-24 flex justify-center py-4 items-center">
        <div onClick={closeTimeSelectionPopup} className={`hover:bg-gray-400 mr-3 ${colorState.box1color}  w-16 h-16 rounded-full font-bold text-2xl flex  text-gray-700 justify-center items-center`}><MdRestartAlt /></div>
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
            <div onClick={openTimeSelectionPopup} className={`hover:bg-gray-400 ml-3 ${colorState.box1color}  w-16 h-16 rounded-full font-bold text-2xl flex  text-gray-700 justify-center items-center`}><IoMdSettings/></div>
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
            <CustomSettingsPopUp isOpen={isTimeSelecetionPopupOpen} onClose={closeTimeSelectionPopup}  />
        }
    </div>
    );
    
    };
    
    export default CustomMode;
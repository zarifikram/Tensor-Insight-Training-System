import { AuthContext } from "./helpers/AuthContext";
import { ColorContext } from "./helpers/ColorContext";
import React, { useContext } from "react";
import { useState } from "react";

import CodePane from "./CodePane";
import { RxCross2 } from "react-icons/rx";//<RxCross2/>
import { IoMdCheckmark } from "react-icons/io";//<IoMdCheckmark />

import TimeModePopUp from "./TimeModePopUp";
import TimeSelectionPopUp from "./TimeSelectionPopUp";
import axios from 'axios';
import { useEffect } from "react";

const TimeMode = () =>{
    const [colorState,setColorState]= useContext(ColorContext);
    const [authState,setAuthState] = useContext(AuthContext);
    const [code, setCode] = React.useState("Start typing your code...");

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
    const [isTimeSelecetionPopupOpen, setTimeSelecetionPopupOpen] = useState(true);
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

    

    const closeTimeSelectionPopup =  () => {
        setTimeSelecetionPopupOpen(false);
        //console.log("tttt");
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
              console.log(JSON.stringify(test_cases[i].input));
              setPages(temp);
            }
            console.log(pages);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    };

     useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.shiftKey && event.ctrlKey ) {
        console.log("Shift + ctrlKey");
        let temp=[];
        for (let i = 0; i < pages.length; i++) {
          const input = pages[i].inputTensor;
          const output = pages[i].expectedTensor;
          const test_case_no = i + 1; // Adjust the logic based on your requirements
          // Create a JSON object and push it to the 'temp' array
          temp.push({
            input: input,
            output: output,
            test_case_no: test_case_no
          });
        }

        console.log(temp);
        console.log(code);
        // axios.post("http://127.0.0.1:8000/api/run-problem/",{
          
        // })
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
            time mode
        </div>
        <div className={`pt-20 ${colorState.textcolor2} font-roboto text-2xl font-bold`}>{authState.timerModeRunning}</div>
        <CodePane code={code} setCode={setCode}/>
        {
            <TimeModePopUp isOpen={isPopupOpen} onClose={closePopup} currentPage={currentPage} setCurrentPage={setCurrentPage} pages={pages}/>
        }
                {
            <TimeSelectionPopUp isOpen={isTimeSelecetionPopupOpen} onClose={closeTimeSelectionPopup}  />
        }
    </div>
    );
    
    };
    
    export default TimeMode;
import { AuthContext } from "../helpers/AuthContext";
import { ColorContext } from "../helpers/ColorContext";
import React, { useContext } from "react";
import { useState } from "react";
import AddProblemSettingsPopUp from "./AddProblemSettingsPopUp";

import axios from 'axios';
import { useEffect } from "react";
import Cookies from 'js-cookie';
import { useRef } from "react";

const AddProblem = () =>{

  const [colorState,setColorState]= useContext(ColorContext);
  const [authState,setAuthState] = useContext(AuthContext);
  const codeRef = useRef();

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

    const [isPopupOpen, setPopupOpen] = useState(false);

    const openPopup = () => {
        setPopupOpen(true);
    };

    const closePopup = () => {
        setPopupOpen(false);
    };

    const [title,setTitle] =useState("title")
    const [description,setDescription] =useState("description")
    const [depth,setDepth] =useState(-1)
    const [solution,setSolution] =useState("solution")
    const [editorial_image,setEditorial_image] =useState(null)
  //const [used_manipulator,setTitle] =useState("title")

  const handleEditChange1 = (event) => {
    setTitle(event.target.value);
  };

  const handleEditChange2 = (event) => {
    setDescription(event.target.value);
  };

  const handleEditChange3 = (event) => {
    setDepth(event.target.value);
  };

  const handleEditChange4 = (event) => {
    setSolution(event.target.value);
  };

  const handleEditChange5 = (event) => {
    const file = event.target.files[0]; // Get the first file from the selected files
    setEditorial_image(file); // Set the state with the selected image file
  
  };

//Problem 1-----------------------
const [input1,setInput1] =useState("[]")
const [output1,setOutput1] =useState("[]")

const handleEditChange11 = (event) => {
  setInput1(event.target.value);
};

const handleEditChange12 = (event) => {
  setOutput1(event.target.value);
};

//Problem 2-----------------------
const [input2,setInput2] =useState("[]")
const [output2,setOutput2] =useState("[]")

const handleEditChange21 = (event) => {
  setInput2(event.target.value);
};

const handleEditChange22 = (event) => {
  setOutput2(event.target.value);
};

//Problem 3-----------------------
const [input3,setInput3] =useState("[]")
const [output3,setOutput3] =useState("[]")

const handleEditChange31 = (event) => {
  setInput3(event.target.value);
};

const handleEditChange32 = (event) => {
  setOutput3(event.target.value);
};

//Problem 4-----------------------
const [input4,setInput4] =useState("[]")
const [output4,setOutput4] =useState("[]")

const handleEditChange41 = (event) => {
  setInput4(event.target.value);
};

const handleEditChange42 = (event) => {
  setOutput4(event.target.value);
};

//Problem 5-----------------------
const [input5,setInput5] =useState("[]")
const [output5,setOutput5] =useState("[]")

const handleEditChange51 = (event) => {
  setInput5(event.target.value);
};

const handleEditChange52 = (event) => {
  setOutput5(event.target.value);
};


/*
{
    "title": "Untitled Problem",
    "description": "No description",
    "depth": -1,
    "used_manipulator": {},
    "test_cases": [
      {
        "input": "string",
        "output": "string",
        "test_case_no": 9223372036854776000
      }
    ],
    "solution": "No solution",
    "editorial_image": "string"
  }
*/
const [problem,setProblem] = useState()
const Add = () =>{

  setProblem({
    title: title,
    description: description,
    depth: depth,
    used_manipulator: settings.manipulator,
    test_cases: [
      {
        input: input1,
        output: output1,
        test_case_no: 1
      },
      {
        input: input2,
        output: output2,
        test_case_no: 2
      },
      {
        input: input3,
        output: output3,
        test_case_no: 3
      },
      {
        input: input4,
        output: output4,
        test_case_no: 4
      },
      {
        input: input5,
        output: output5,
        test_case_no: 5
      }
    ],
    solution: solution,
    
  })
//editorial_image: editorial_image,
  axios.post(`http://127.0.0.1:8000/api/user/add-problem/`,problem).then((response) => {
      console.log(response.data);
      
  }).catch((error) => {
      console.error("Error fetching data:", error);
  });
}

useEffect(() => {
  console.log(problem);
}, [problem]); 


    return(
    <div className={`mx-40 ${colorState.textcolor} font-roboto`}>
      <div className={`text-2xl font-bold ${colorState.textcolor2} py-3 `}>
        Add Problem
      </div>
      <div className={`flex flex-col w-60% `}>
        <div className="flex justify-between">
          <div className={`pr-2 mb-2 flex items-center font-bold`}>Title:</div>
          <input value={title} onChange={handleEditChange1} className={`${colorState.box1color} p-2 rounded-md mb-2`}  />
        </div>
        <div className="flex justify-between">
          <div className={`pr-2 mb-2 flex items-center font-bold`}>Description:</div>
          <input value={description} onChange={handleEditChange2} className={`${colorState.box1color} p-2 rounded-md mb-2`}  /> 
        </div>
        <div className="flex justify-between">
          <div className={`pr-2 mb-2 flex items-center font-bold`}>Depth:</div>
          <input value={depth} type='number' onChange={handleEditChange3} className={`${colorState.box1color} p-2 rounded-md mb-2`} />
        </div>
        <div className="flex justify-between">
          <div className={`pr-2 mb-2 flex items-center font-bold`}>Solution:</div>
          <input value={solution} onChange={handleEditChange4} className={`${colorState.box1color} p-2 rounded-md mb-2`}  />
        </div>
        {/*
                  <div className="flex justify-between">
                  <div className={`pr-2 mb-2 flex items-center font-bold`}>Editorial Image:</div>
                  <input type="file"
                accept="image/*"  onChange={handleEditChange5} className={`${colorState.box1color} p-2 rounded-md mb-2`}  />
                </div>
    */}

        <div className="flex">
          <div className={`${colorState.box1color} p-2 rounded-md  hover:bg-gray-400`} onClick={() => setPopupOpen(prevState => !prevState)}> Select Manipulators </div>
        </div>

      <div className={`pt-3 flex flex-col mt-3`}>
        <div className={` text-xl ${colorState.textcolor2} pb-1`}>Test Case 1:</div>
        <div className={`flex items-center`}>
          <div className={`font-bold flex items-center pr-5`}>Input:</div>
          <input value={input1} type='string' onChange={handleEditChange11} className={`${colorState.box1color} p-2 rounded-md mb-2`} />
        </div>
        <div className={`flex items-center`}>
          <div className={`font-bold flex items-center pr-2`}>Output:</div>
          <input value={output1} type='string' onChange={handleEditChange12} className={`${colorState.box1color} p-2 rounded-md mb-2`} />
        </div>
      </div>

      <div className={`pt-3 flex flex-col mt-3`}>
        <div className={` text-xl ${colorState.textcolor2} pb-1`}>Test Case 2:</div>
        <div className={`flex items-center`}>
          <div className={`font-bold flex items-center pr-5`}>Input:</div>
          <input value={input2} type='string' onChange={handleEditChange21} className={`${colorState.box1color} p-2 rounded-md mb-2`} />
        </div>
        <div className={`flex items-center`}>
          <div className={`font-bold flex items-center pr-2`}>Output:</div>
          <input value={output2} type='string' onChange={handleEditChange22} className={`${colorState.box1color} p-2 rounded-md mb-2`} />
        </div>
      </div>

      <div className={`pt-3 flex flex-col mt-3`}>
        <div className={` text-xl ${colorState.textcolor2} pb-1`}>Test Case 3:</div>
        <div className={`flex items-center`}>
          <div className={`font-bold flex items-center pr-5`}>Input:</div>
          <input value={input3} type='string' onChange={handleEditChange31} className={`${colorState.box1color} p-2 rounded-md mb-2`} />
        </div>
        <div className={`flex items-center`}>
          <div className={`font-bold flex items-center pr-2`}>Output:</div>
          <input value={output3} type='string' onChange={handleEditChange32} className={`${colorState.box1color} p-2 rounded-md mb-2`} />
        </div>
      </div>

      <div className={`pt-3 flex flex-col mt-3`}>
        <div className={` text-xl ${colorState.textcolor2} pb-1`}>Test Case 4:</div>
        <div className={`flex items-center`}>
          <div className={`font-bold flex items-center pr-5`}>Input:</div>
          <input value={input4} type='string' onChange={handleEditChange41} className={`${colorState.box1color} p-2 rounded-md mb-2`} />
        </div>
        <div className={`flex items-center`}>
          <div className={`font-bold flex items-center pr-2`}>Output:</div>
          <input value={output4} type='string' onChange={handleEditChange42} className={`${colorState.box1color} p-2 rounded-md mb-2`} />
        </div>
      </div>

      <div className={`pt-3 flex flex-col mt-3`}>
        <div className={` text-xl ${colorState.textcolor2} pb-1`}>Test Case 5:</div>
        <div className={`flex items-center`}>
          <div className={`font-bold flex items-center pr-5`}>Input:</div>
          <input value={input5} type='string' onChange={handleEditChange51} className={`${colorState.box1color} p-2 rounded-md mb-2`} />
        </div>
        <div className={`flex items-center`}>
          <div className={`font-bold flex items-center pr-2`}>Output:</div>
          <input value={output5} type='string' onChange={handleEditChange52} className={`${colorState.box1color} p-2 rounded-md mb-2`} />
        </div>
      </div>
      <div className={`font-bold text-xl ${colorState.box1color} p-3 mt-3 rounded-md w-40% hover:bg-gray-400 flex justify-center items-center`} onClick={Add}>submit</div>
      </div>
      
      {
        <AddProblemSettingsPopUp isOpen={isPopupOpen} onClose={closePopup} settings={settings} setSettings={setSettings} />
      }
    </div>
    );
    
    };
    
    export default AddProblem;
// Popup.js
import { AuthContext } from "../helpers/AuthContext";
import { ColorContext } from "../helpers/ColorContext";
import react,{ useContext } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ProblemPopUp from "./ProblemPopUp";
import { useRef } from "react";

import CodePane from "../CodePane";
import { RxCross2 } from "react-icons/rx";//<RxCross2/>
import { IoMdCheckmark } from "react-icons/io";//<IoMdCheckmark />

import { useState } from "react";
axios.defaults.withCredentials= true;

const Problem = () => {
  let {id} = useParams();
  const codeRef = useRef();

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

    const [pages,setPages] = useState([  {
      reached:false
    }, {
      reached:false
    } ,{
      reached:false
    }, {
      reached:false
    }, {
      reached:false
    }
  ])

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
        axios.get(`http://127.0.0.1:8000/api/problem/${id}/`)
        .then((response) => {
        console.log(response.data);
        setProblem(response.data)
        }).catch((error) => {
            console.error("Error fetching data:", error);
        });
      }, [id]);

      useEffect(() => {
        console.log("ret1212")
   
      }, [problem]);


    return (
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
            <ProblemPopUp isOpen={isPopupOpen} onClose={closePopup} currentPage={currentPage} setCurrentPage={setCurrentPage} pages={pages} problem={problem}/>
        }
    </div>
  );
};

export default Problem;

import { AuthContext } from "../helpers/AuthContext";
import { ColorContext } from "../helpers/ColorContext";
import React, { useContext } from "react";
import { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

import Problem from "./Problem";
import axios from 'axios';
import { useEffect } from "react";


import { useRef } from "react";

const ProblemSet = ({ isOpen, onClose,children }) =>{
    const [colorState,setColorState]= useContext(ColorContext);
    const [authState,setAuthState] = useContext(AuthContext);

    const handleClose = (e) => {
        // Close the popup only if the overlay is clicked
        if(!isPopupOpen)
            if (e.target.classList.contains('overlay')) {
                onClose();
            }
        };
   
    //Popup--------------------------------------------
    const [isPopupOpen, setPopupOpen] = useState(false);
    
    const openPopup = () => { 
        setPopupOpen(true);    
    };
    
    const closePopup = () => {
        setPopupOpen(false);
    };

    //Problems------------------------------------------
    const [perPage, setPerPage] = useState('10');
    const [currentPage,setCurrentPage] =useState(1);

    const [currentProblem,setCurrentProblem] = useState();

    const [problems,setProblems] = useState({
        "count": 27,
        "next": "http://127.0.0.1:8000/api/problem-set/?page=3&page_size=10",
        "previous": "http://127.0.0.1:8000/api/problem-set/?page_size=10",
        "results": [
            {
                "id": 17,
                "difficulty": "4.40",
                "used_manipulator": "[\"argmax\", \"gather\", \"t\"]",
                "solve_count": 3,
                "try_count": 45,
                "depth": 5,
                "is_user_added": false,
                "addedAt": "2024-01-27T07:40:12.379917Z",
                "status": null
            },
            {
                "id": 16,
                "difficulty": "3.70",
                "used_manipulator": "[\"where\", \"tile\", \"positive\", \"argwhere\", \"movedim\"]",
                "solve_count": 0,
                "try_count": 0,
                "depth": 5,
                "is_user_added": false,
                "addedAt": "2024-01-27T07:40:11.607640Z",
                "status": null
            },
            {
                "id": 15,
                "difficulty": "3.40",
                "used_manipulator": "[\"negative\", \"splicing\", \"argmax\", \"clip\"]",
                "solve_count": 0,
                "try_count": 0,
                "depth": 4,
                "is_user_added": false,
                "addedAt": "2024-01-27T07:40:10.858286Z",
                "status": null
            }
        ]
    });

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/problem-set/?page_size=${perPage}`)
        .then((response) => {
        console.log(response.data);
        setProblems(response.data)
        }).catch((error) => {
            console.error("Error fetching data:", error);
        });
      }, [perPage]);

      useEffect(() => {
            console.log("ee");
      }, [problems]);

    const enterProblem =(id)=>{
        console.log("enter:"+id)
        setCurrentProblem(id);
        
    }

     useEffect(() => {
        console.log("openPop")
        openPopup();
   }, [currentProblem]);

    const goToPage=(page)=>{
        axios.get(`http://127.0.0.1:8000/api/problem-set/?page=${page}&page_size=${perPage}`)
        .then((response) => {
        console.log(response.data);
        setProblems(response.data)
        }).catch((error) => {
            console.error("Error fetching data:", error);
        });

        setCurrentPage(page);
    }

    const goForward=()=>{
        axios.get(problems.next)
        .then((response) => {
        console.log(response.data);
        setProblems(response.data)
        }).catch((error) => {
            console.error("Error fetching data:", error);
        });

        if((currentPage+1)<Math.ceil(problems.count / perPage))
            setCurrentPage(currentPage+1);
    }

    const goBackward=()=>{
        axios.get(problems.previous)
        .then((response) => {
        console.log(response.data);
        setProblems(response.data)
        }).catch((error) => {
            console.error("Error fetching data:", error);
        });

        if((currentPage-1)>0)
            setCurrentPage(currentPage-1);
    }
//----------------
    

    const handleSelectChange = (e) => {
        const selectedOptionValue = e.target.value;
        setPerPage(selectedOptionValue);
        console.log(perPage)
    };

    

    return(
        <>
        <div
          className={`fixed inset-0 overflow-y-auto transition-opacity duration-300 
          ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          onClick={handleClose} // Added onClick event for the entire popup
          >
          <div className="flex items-center justify-center min-h-screen">
            <div className="overlay fixed inset-0 bg-black opacity-50"></div>
            <div className={` z-40 ${colorState.bgcolor} ${colorState.textcolor} p-4 max-w-screen-lg w-85% mx-auto rounded-md shadow-md transition-transform  transform duration-300 `} >
              <div>
  
  
              <div className={`mx-5`}>
                <div className={`flex w-100% justify-between pb-1`}>
                    <div className={`flex w-50% justify-start`}>
                        <div className={`w-10% flex justify-center`}>id</div>
                        <div className={`pl-20`}>tags</div>
                    </div>
                    <div className={`flex w-50% justify-between`}>
                        <div className={`w-25% flex justify-center`}>solved</div>
                        <div className={`w-25% flex justify-center`}>acceptance</div>
                        <div className={`w-25% flex justify-center`}>depth</div>
                        <div className={`w-25% flex justify-center`}>difficulty</div>
                    </div>
                </div>
                 {Array.from({ length: problems.results.length }, (_, index) => (    
                <div className={` `} onClick={() => enterProblem(problems.results[index].id)}>
                    <div  className={`${(index+1)%2===1 ?`${colorState.box1color} w-100% flex justify-between rounded-md hover:bg-gray-400 hover:rounded-md py-2`:`w-100% flex justify-between hover:bg-gray-400 hover:rounded-md py-2`}`}>
                        <div className={`flex w-50% justify-start`}>
                            <div className={`w-10% flex justify-center`}>{problems.results[index].id}</div>
                            <div className={`pl-20`}>{problems.results[index].used_manipulator}</div>
                        </div>
                        <div className={`flex w-50% justify-between `}>
                            <div className={`w-25% flex justify-center `}>{problems.results[index].solve_count}</div>
                            <div className={`w-25% flex justify-center`}>{problems.results[index].try_count!=0 ? (100*problems.results[index].solve_count/problems.results[index].try_count).toFixed(2)+"%" : "0.00%"}</div>
                            <div className={`w-25% flex justify-center`}>{problems.results[index].depth}</div>
                            <div className={`w-25% flex justify-center`}>{problems.results[index].difficulty}</div>
                        </div>
                    </div>
                </div>
                ))}
                    <div className={`flex w-100% justify-between pt-5`}>
                        <select className={`${colorState.box1color} py-2 rounded-md `}
                        onChange={handleSelectChange}
                        value={perPage}
                        >
                            <option value="10">10/page</option>
                            <option value="20">20/page</option>
                            <option value="30">30/page</option>
                            <option value="50">50/page</option>
                        </select>
                        <div className={`flex justify-end`}>
                            <div className={`${colorState.box1color} py-2 px-4 ml-2 rounded-md hover:bg-gray-400 flex items-center`} onClick={goBackward}><IoIosArrowBack/></div>
                            {Array.from({ length: Math.ceil(problems.count / perPage) }, (_, index) => (  
                            <div className={`${(index+1)==currentPage?`${colorState.box2color} py-2 px-4 ml-2 rounded-md hover:bg-grey-400 `:`${colorState.box1color} py-2 px-4 ml-2 rounded-md hover:bg-gray-400`}`} 
                            onClick={() =>goToPage(index+1)}>{index+1}</div>
                            ))}
                            <div className={`${colorState.box1color} py-2 px-4 ml-2 rounded-md hover:bg-gray-400 flex items-center `} onClick={goForward}><IoIosArrowForward/></div>
                        </div>   
                    </div>
                </div>
                        
                {
                    <Problem isOpen={isPopupOpen} onClose={closePopup} problemId={currentProblem}/>
                }
              </div>
            </div>
          </div>
        </div>
      </>
    );
    
    };
    
    export default ProblemSet;
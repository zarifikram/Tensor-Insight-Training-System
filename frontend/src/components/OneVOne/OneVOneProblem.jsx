// Popup.js
import { AuthContext } from "../helpers/AuthContext";
import { ColorContext } from "../helpers/ColorContext";
import { EnvVariableContext } from "../helpers/EnvVariableContext";
import react,{ useContext } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import OneVOneProblemPopUp from "./OneVOneProblemPopUp";
import { useRef } from "react";
import { CgArrowUpO } from "react-icons/cg";

import CodePane from "../CodePane";
import { RxCross2 } from "react-icons/rx";//<RxCross2/>
import { IoMdCheckmark } from "react-icons/io";//<IoMdCheckmark />
import { ClipLoader } from 'react-spinners';

import { useState } from "react";
import { toast } from "react-toastify";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
axios.defaults.withCredentials= true;

function calculateTimeLeft(startedAt, durationInSeconds) {
    const startTime = new Date(startedAt);
    const endTime = new Date(startTime.getTime() + durationInSeconds * 1000);
    const currentTime = new Date().getTime();
    const timeDifference = endTime - currentTime;

    if (timeDifference <= 0) {
      return "Ended";
    }

    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    return `${hours}h ${minutes}m ${seconds}s left`;
  }

const OneVOneProblem = () => {
    //*Live Update------------------------------------------
    const [loading,setLoading] = useState(true);
    const navigate = useNavigate();

    const onevoneIni2 = {
        "title": "ertertert",
        "description": "dsdf",
        "duration": 600,
        "status": "started",
        "num_of_problem": 3,
        "user1": {
            "username": "hafiz",
            "id": 8,
            "score": 0.0
        },
        "user2": {
            "username": "saif",
            "id": 6,
            "score": 0.0
        },
        "started_at": "2024-02-27T18:15:35.586399Z",
        "problem_list": {
            "1": {
                "id": 108,
                "is_user1_solved": -1,
                "is_user2_solved": -1
            },
            "2": {
                "id": 109,
                "is_user1_solved": -1,
                "is_user2_solved": -1
            },
            "3": {
                "id": 110,
                "is_user1_solved": -1,
                "is_user2_solved": -1
            }
        }
    }
    const [key,setKey] = useState("")
    const [onevone, setOnevone] = useState(null)

    const [timeLeft, setTimeLeft] = useState("");

    useEffect(() => {
        if(onevone!=null)
        if(onevone.started_at!=null){
        const timerInterval = setInterval(() => {
          setTimeLeft(calculateTimeLeft(onevone.started_at,onevone.duration));
          if(calculateTimeLeft(onevone.started_at,onevone.duration)==="Ended")
            navigate('/OneVOne')
            
        }, 1000);
    
        return () => clearInterval(timerInterval);
            }
      }, [onevone]);

      

      useEffect(() => {      
        const fetchData = () => {
          axios.get(`http://127.0.0.1:8000/api/1-v-1/`)
            .then((response) => {
              setOnevone(response.data);
              setLoading(false);
            }).catch((error) => {
              console.error("Error fetching data:", error);
            });
        };
    
        fetchData(); // Call initially
    
        const interval = setInterval(() => {
          fetchData(); // Call at each interval
        }, 1000); // 1000 milliseconds = 1 second
    
        return () => clearInterval(interval); // Clean up interval on component unmount
      }, []); // Empty dependency array ensures effect runs only on mount



    //*Problem-----------------------------------------------
  let {id} = useParams();
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
        axios.get(`http://127.0.0.1:8000/api/problem/${id}/`)
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
        axios.post(`http://127.0.0.1:8000/api/1-v-1/problem/${id}/submit/`,{
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
                {
            (!loading)&&(<div className={``}>
                    <div className={`flex justify-center text-2xl mt-3 ${colorState.captioncolor}`}>
                        <div className={`p-1   rounded-md flex ${(onevone.user1.score>onevone.user2.score)?`${colorState.box2color}`:``}`}>
                            <div className={`${(onevone.user1.score>onevone.user2.score)?`px-2 ${colorState.textcolor} text-2xl font-bold flex items-center`:`hidden`}`}>winning!</div>
                            <div className={`px-2 py-2 ${colorState.box1color} flex rounded-md`}>
                                <div className={`px-2 py-1 ${colorState.bgcolor} rounded-md`}>{onevone.user1.username}</div>
                                <div className={`pl-2 py-1 ${colorState.textcolor2}`}>{onevone.user1.score}</div>
                            </div>
                        </div>
                        <div className={`mx-2 flex items-center`}>vs</div>
                        <div  className={`p-1 rounded-md flex ${(onevone.user2.score > onevone.user1.score)?`${colorState.box2color}`:``}`}>
                            <div className={`px-2 py-2 ${colorState.box1color} flex rounded-md`}>
                                <div className={`pr-2 py-1 ${colorState.textcolor2}`}>{onevone.user2.score}</div>
                                <div className={`px-2 py-1 ${colorState.bgcolor} rounded-md`}>{onevone.user2.username}</div>
                            </div>
                            <div className={`${(onevone.user2.score>onevone.user1.score)?`px-2 ${colorState.textcolor} text-2xl font-bold flex items-center`:`hidden`}`}>winning!</div>
                        </div>
                    </div>
                    <div className={`flex justify-center`}> 
                    <div className={`flex justify-center items-center text-2xl mt-2 py-2 px-5 ${colorState.captioncolor} rounded-full ${colorState.box1color}`}>
                    {timeLeft}
                    </div>
                    </div>
            </div>)
            }
            {(loading) && (
                <ClipLoader color="#000" loading={loading} size={50} />
               )}
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
            <div onClick={submitAnswer} className={ `hover:bg-gray-400 ml-3 ${colorState.box1color} w-16  h-16 rounded-full font-bold text-2xl flex  text-gray-700 justify-center items-center`}><CgArrowUpO /></div>
        </div>
        <CodePane  onCodeChange={handleCodeChange} />
        {
            <OneVOneProblemPopUp isOpen={isPopupOpen} onClose={closePopup} currentPage={currentPage} setCurrentPage={setCurrentPage} pages={pages} problem={problem}/>
        }
        {
            <ToastContainer />
        }
    </div>
  );
};

export default OneVOneProblem;

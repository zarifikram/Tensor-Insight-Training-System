import { AuthContext } from "../helpers/AuthContext";
import { ColorContext } from "../helpers/ColorContext";
import React, { useContext } from "react";
import { useState } from "react";
import { AiOutlineCaretUp } from "react-icons/ai";
import { AiOutlineCaretDown } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";

import axios from 'axios';
import { useEffect } from "react";
import Cookies from 'js-cookie';
import { useRef } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router";

const Discussion = () =>{
    const iniDiscussion={
        "id": 1,
        "title": "Cras porttitor augue nec consequat dignissim. Quisque pellentesque, eros ultrices lacinia",
        "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitiamolestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit, quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos  sapiente officiis modi at sunt excepturi expedita sint? Sed quibusdam recusandae alias error harum maxime adipisci amet laborum. Perspiciatis   minima nesciunt dolorem! Officiis iure rerum voluptates a cumque velit   quibusdam sed amet tempora. Sit laborum ab, eius fugit doloribus tenetur fugiat, temporibus enim commodi iusto libero magni deleniti quod quam "
     ,
        "created_at": "2024-02-20T18:34:37.590938Z",
        "is_resolved": true,
        "user": {
          "id": 3,
          "first_name": "Anamul ",
          "last_name": "Hoque"
        },
        "answers": [ 
          {
            "id": 2,
            "answer": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitiamolestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit, quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos  sapiente officiis modi at sunt excepturi expedita sint? Sed quibusdam recusandae alias error harum maxime adipisci amet laborum. Perspiciatis   minima nesciunt dolorem! Officiis iure rerum voluptates a cumque velit   quibusdam sed amet tempora. Sit laborum ab, eius fugit dolo",
            "created_at": "2024-02-20T18:47:55.633753Z",
            "user": {
              "id": 3,
              "first_name": "Anamul ",
              "last_name": "Hoque"
            },
            "is_accepted": true,
            "reply": [
                {
                    "id": 2,
                    "reply": "test reply",
                    "created_at": "2024-02-21T18:18:54.523098Z",
                    "user": {
                    "id": 3,
                    "first_name": "Anamul ",
                    "last_name": "Hoque"
                    }
                },
                {
                    "id": 3,
                    "reply": "another reply",
                    "created_at": "2024-02-21T18:18:54.523098Z",
                    "user": {
                      "id": 4,
                      "first_name": "saif ",
                      "last_name": "hafiz"
                    }
              }
            ],
            "vote": 7,
            "user_vote": "down"
          },
          {
            "id": 2,
            "answer": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitiamolestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit, quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos  sapiente officiis modi at sunt excepturi expedita sint? Sed quibusdam recusandae alias error harum maxime adipisci amet laborum. Perspiciatis   minima nesciunt dolorem! Officiis iure rerum voluptates a cumque velit   quibusdam sed amet tempora. Sit laborum ab, eius fugit dolo",
            "created_at": "2024-02-20T18:47:55.633753Z",
            "user": {
              "id": 3,
              "first_name": "Anamul ",
              "last_name": "Hoque"
            },
            "is_accepted": true,
            "reply": [
                {
                    "id": 2,
                    "reply": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitiamolestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit, quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos  sapiente officiis modi at sunt excepturi expedita sint? Sed quibusdam recusandae alias error harum maxime adipisci amet laborum. Perspiciatis   minima nesciunt dolorem! Officiis iure rerum voluptates a cumque velit   quibusdam sed amet tempora. Sit laborum ab, eius fugit dolo",
                    "created_at": "2024-02-21T18:18:54.523098Z",
                    "user": {
                    "id": 3,
                    "first_name": "Anamul ",
                    "last_name": "Hoque"
                    }
                },
                {
                    "id": 3,
                    "reply": "another reply",
                    "created_at": "2024-02-21T18:18:54.523098Z",
                    "user": {
                      "id": 4,
                      "first_name": "saif ",
                      "last_name": "hafiz"
                    }
              }
            ],
            "vote": -1,
            "user_vote": null
          }
        ],
        "vote": 1,
        "user_vote": "up"
      }

    let {id} = useParams();
    const navigate = useNavigate();

    const [colorState,setColorState]= useContext(ColorContext);
    const [authState,setAuthState] = useContext(AuthContext);
    const [discussion,setDiscussion] = useState(iniDiscussion)
 

    // useEffect(() => {
    //     axios.get(`http://127.0.0.1:8000/api/discussion-forum/${id}/`)
    //         .then((response) => {
    //             console.log(response.data);
    //             setDiscussion(response.data)
    //         }).catch((error) => {
    //             console.error("Error fetching data:", error);
    //         });
    // }, []); 

    const calculateTimeDifference = (time) => {
      const currentTime = new Date();
      const pastTime = new Date(time);
      const difference = currentTime - pastTime;
  
      const seconds = Math.floor(difference / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);
  
      if (days > 0) {
          return `${days} day${days !== 1 ? 's' : ''} ago`;
      } else if (hours > 0) {
          return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
      } else if (minutes > 0) {
          return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
      } else {
          return `${seconds} second${seconds !== 1 ? 's' : ''} ago`;
      }
  };

  const [answer, setAnswer] = useState('');

  const givanswer = (event) => {
    setAnswer(event.target.value);
  };

    return(
    <div className={`mx-40 ${colorState.textcolor} font-roboto`}>    
        <div className={`flex mb-16`}>
          <div className={`w-16 `}>
            <div className={`w-12 h-12 text-3xl flex justify-center items-center  rounded-full ${discussion.user_vote==="up"? `${colorState.box2color}`:`${colorState.box1color} hover:bg-gray-400`}`}><AiOutlineCaretUp/></div>
            <div className={`w-12 h-12 text-3xl flex justify-center items-center  ${discussion.user_vote!=null?`${colorState.textcolor2}`:``}`}>{discussion.vote}</div>
            <div className={`w-12 h-12 text-3xl flex justify-center items-center  rounded-full ${discussion.user_vote==="down"? `${colorState.box2color}`:`${colorState.box1color} hover:bg-gray-400`}`}><AiOutlineCaretDown/></div>
          </div>
          <div className={`ml-4`}>
            <div>
              <div className={`text-3xl font-bold mb-3 ${colorState.textcolor2}`}>{discussion.title}</div>
              <div className={``}>{discussion.description}</div>
            </div>
            <div className={`flex justify-end mt-3`}>
          <div>
              <div className="flex"><div className="mr-2">asked</div>{calculateTimeDifference(discussion.created_at)}</div>
              <div className={`flex items-center text-xl ${colorState.captioncolor}`}>
                    <div className={`mr-3`}> <FaUserCircle /></div> {discussion.user.first_name+" "+discussion.user.last_name}</div>
                </div>


          </div>

          </div>
        </div>
        <div className="flex">
            <textarea className={`w-full h-16 rounded-lg p-4 ${colorState.box1color}  font-roboto  ${colorState.textcolor}  text-xl `}
            value={answer}
            onChange={givanswer} />
            <div className={`ml-2 w-40 h-16 rounded-md ${colorState.box1color} ${colorState.textcolor2} text-2xl flex justify-center items-center hover:bg-gray-400`}>
              Answer
            </div>
        </div>

        <div className={` flex mt-4 mb-5 text-2xl font-bold ${colorState.captioncolor}`}>
          
              {discussion.answers.length > 1 ? 
              (<>
              {discussion.answers.length} <div className={`ml-2`}>Answers</div>
              </>) :
              (<>
                {discussion.answers.length} <div className={`ml-2`}>Answer</div>
              </>)}
        </div>
        {discussion.answers.map((answer, index) => (
                <div className={`flex mb-8`}>
                  <div className={`w-16 `}>
                    <div className={`w-10 h-10 text-xl flex justify-center items-center  rounded-full ${answer.user_vote==="up"? `${colorState.box2color}`:`${colorState.box1color} hover:bg-gray-400`}`}><AiOutlineCaretUp/></div>
                    <div className={`w-10 h-10 text-xl flex justify-center items-center  ${answer.user_vote!=null?`${colorState.textcolor2}`:``}`}>{answer.vote}</div>
                    <div className={`w-10 h-10 text-xl flex justify-center items-center  rounded-full ${answer.user_vote==="down"? `${colorState.box2color}`:`${colorState.box1color} hover:bg-gray-400`}`}><AiOutlineCaretDown/></div>
                  </div>
                  <div className={`ml-4`}>
                    <div>  
                      <div className={`text-xl`}>{answer.answer}</div>
                    </div>
                    <div className={`flex justify-start mt-3 mb-2`}>
                 
                      <div>
                      <div className="flex"><div className="mr-2">answered</div>{calculateTimeDifference(answer.created_at)}</div>
                      <div className={`flex items-center text-xl ${colorState.captioncolor}`}>
                      <div className={`mr-3`}> <FaUserCircle /></div> {answer.user.first_name+" "+answer.user.last_name}</div>
                      </div>
                 
                  </div>
                  <div className={`h-1 w-full rounded-md mb-3 ${colorState.box1color}`}></div>
                      <div className={`ml-10`}>
                        {answer.reply.map((reply, index) => (
                          <div className={`flex justify-start mb-5`}>
                            <div>
                              <div className={`flex`}>
                                <div className={`flex items-center `}>
                                  <div className={`mr-3 `}> <FaUserCircle /></div> {reply.user.first_name+" "+reply.user.last_name}</div>
                                <div className="flex"><div className="mr-2 ml-5">replied</div>{calculateTimeDifference(reply.created_at)}</div>
                              </div>
                              <div>{reply.reply}</div>
                            </div>
                            
                          </div>
                        ))}
                      </div>
                  </div>
                </div>
        ))}
    </div>
    );
    
    };
    
    export default Discussion;
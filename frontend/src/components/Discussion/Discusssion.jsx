import { AuthContext } from "../helpers/AuthContext";
import { ColorContext } from "../helpers/ColorContext";
import React, { useContext } from "react";
import { useState } from "react";
import { AiOutlineCaretUp } from "react-icons/ai";
import { AiOutlineCaretDown } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import { AiOutlineCheck } from "react-icons/ai";

import axios from 'axios';
import { useEffect } from "react";
import Cookies from 'js-cookie';
import { useRef } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import { ClipLoader } from 'react-spinners';


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

const Discussion = () =>{
    const [isLoading,setIsloading]=useState(true);
    const [envVariables,setEnvVariables] = useContext(EnvVariableContext);
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
    const [discussion,setDiscussion] = useState({})
 

    useEffect(() => {
      const interval = setInterval(() => {
        axios.get(`http://127.0.0.1:8000/api/discussion-forum/${id}/`)
            .then((response) => {
                console.log(response.data);
                setDiscussion(response.data)
                setIsloading(false)
            }).catch((error) => {
                console.error("Error fetching data:", error);
            });
          }, 1000); // Run every second (1000 milliseconds)
          // Clean up the interval when the component unmounts or when the dependency changes
          return () => clearInterval(interval);
    }, []); 

    //*Voting-------------------------------------------------------
    const upvote = () =>{
      if(authState.loggedIn){
      axios.post(`http://127.0.0.1:8000/api/discussion-forum/${id}/upvote/`)
      .then((response) => {
          console.log(response.data);
      }).catch((error) => {
          console.error("Error fetching data:", error);
      });
    }
    }

    const downvote = () =>{
      if(authState.loggedIn){
      axios.post(`http://127.0.0.1:8000/api/discussion-forum/${id}/downvote/`)
      .then((response) => {
          console.log(response.data);
      }).catch((error) => {
          console.error("Error fetching data:", error);
      });
    }
    }
    //*Submit answer------------------------------------------------


  const [answerbox, setAnswerbox] = useState('');

  const givanswer = (event) => {
    setAnswerbox(event.target.value);
  };

  const submitAnswer = () =>{
    axios.post(`http://127.0.0.1:8000/api/discussion-forum/${id}/add-answer/`,{answer:answerbox})
    .then((response) => {
        console.log(response.data);
    })
    .catch((error) => {
        console.error("Error fetching data:", error);
    });
  }

        //*Edit Answer------------------------------------
        const [editbox1, setEditbox1] = useState('New Title');
        const [editbox2, setEditbox2] = useState('New Description');

        const giveedit1 = (event) => {
          setEditbox1(event.target.value);
        };

        const giveedit2 = (event) => {
          setEditbox2(event.target.value);
        };
  
        const submitEdit = () =>{
          axios.patch(`http://127.0.0.1:8000/api/discussion-forum/${id}/edit/`,{title:editbox1,description:editbox2})
          .then((response) => {
              console.log(response.data);
              setEditbox1('New Title')
              setEditbox2('New Description')
          })
          .catch((error) => {
              console.error("Error fetching data:", error);
          });
        }
        //*Toggle Boxes--------------------------
        //const [replyOn,setReplyOn] =useState(false)
        const [editOn,setEditOn] =useState(false)

      //*Delete Comment----------------------
      const DeleteComment = () =>{
        axios.delete(`http://127.0.0.1:8000/api/discussion-forum/${id}/delete/`)
        .then((response) => {
            console.log(response.data);
            navigate(`/DiscussionList`)
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
        });

        
      }

      //*Resolve----------------------------------
      const resolve = () =>{
        axios.post(`http://127.0.0.1:8000/api/discussion-forum/${id}/resolved/`)
        .then((response) => {
            console.log(response.data);
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
        });
      }
  

    return(
    <div className={`mx-40 ${colorState.textcolor} font-roboto`}>  {
      (!isLoading)&&(<div>
        <div className={`flex mb-16`}>
          <div className={`w-16 `}>{(authState.loggedIn) &&(authState.id===discussion.user.id) &&(
            <div className={`w-12 h-12 text-3xl flex justify-center items-center  rounded-full mb-2 ${discussion.is_resolved? `bg-green-500`:`${colorState.box1color} hover:bg-gray-400`}`} onClick={resolve}><AiOutlineCheck/></div>
          )}
            <div className={`w-12 h-12 text-3xl flex justify-center items-center  rounded-full ${discussion.user_vote==="up"? `${colorState.box2color}`:`${colorState.box1color} hover:bg-gray-400`}`} onClick={upvote}><AiOutlineCaretUp/></div>
            <div className={`w-12 h-12 text-3xl flex justify-center items-center  ${discussion.user_vote!=null?`${colorState.textcolor2}`:``}`}>{discussion.vote}</div>
            <div className={`w-12 h-12 text-3xl flex justify-center items-center  rounded-full ${discussion.user_vote==="down"? `${colorState.box2color}`:`${colorState.box1color} hover:bg-gray-400`}`} onClick={downvote}><AiOutlineCaretDown/></div>
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
        </div>{ authState.loggedIn && (
        <div className="flex mb-2">
            <textarea className={`w-full h-16 rounded-lg p-4 ${colorState.box1color}  font-roboto  ${colorState.textcolor}  text-xl `}
            value={answerbox}
            onChange={givanswer} />
            <div className={`ml-2 w-40 h-16 rounded-md ${colorState.box1color} ${colorState.textcolor2} text-2xl flex justify-center items-center hover:bg-gray-400`} onClick={submitAnswer}>
              Answer
            </div>
        </div>)}
        {(authState.loggedIn) &&(authState.id===discussion.user.id) && (<div className="flex mb-2">
          <div className={` w-40 h-10 rounded-md ${colorState.box1color} ${colorState.textcolor2} text-2xl flex justify-center items-center hover:bg-gray-400 mr-2`} onClick={()=>{setEditOn(prevState => !prevState);}}>
                Edit
            </div>
            <div className={` w-40 h-10 rounded-md ${colorState.box1color} ${colorState.textcolor2} text-2xl flex justify-center items-center hover:bg-gray-400`} onClick={()=>{DeleteComment();}}>
                Delete
            </div>
        </div>)}{
          editOn && (<div> 
            <div className="flex mb-2">
                <input className={`w-full h-10 rounded-lg p-4 ${colorState.box1color}  font-roboto  ${colorState.textcolor}  text-xl `}
                value={editbox1}
                onChange={giveedit1} />
            </div>
            <div className="flex mb-2">
                <input className={`w-full h-10 rounded-lg p-4 ${colorState.box1color}  font-roboto  ${colorState.textcolor}  text-xl `}
                value={editbox2}
                onChange={giveedit2} />
            </div>
            <div className={` w-40 h-10 rounded-md ${colorState.box1color} text-2xl flex justify-center items-center hover:bg-gray-400`} onClick={submitEdit}>
                  Edit
            </div>
        </div>)
      }
        <div className={` flex mt-4 mb-5 text-2xl font-bold ${colorState.captioncolor}`}>
          
              {discussion.answers.length > 1 ? 
              (<>
              {discussion.answers.length} <div className={`ml-2`}>Answers</div>
              </>) :
              (<>
                {discussion.answers.length} <div className={`ml-2`}>Answer</div>
              </>)}
        </div>
        {(discussion.answers!=null)&&(discussion.answers.map((answer, index) => (
                <Answer answer={answer} id={id} />
        )))}
        </div>)
        }
    {(isLoading) && (<div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50">
      <div className="absolute bg-black opacity-40 w-full h-full"></div>
      <ClipLoader color="#000" loading={isLoading} size={50} />
    </div>)}
    </div>
    );
    };
    
    export default Discussion;




    const Answer = ({ answer,id }) => { 
      const [colorState,setColorState]= useContext(ColorContext);
      const [authState,setAuthState] = useContext(AuthContext);

    //*Voting-------------------------------------------------------
    const upvote = () =>{
      if(authState.loggedIn){
      axios.post(`http://127.0.0.1:8000/api/answer/${answer.id}/upvote/`)
      .then((response) => {
          console.log(response.data);
      }).catch((error) => {
          console.error("Error fetching data:", error);
      });}
    }

    const downvote = () =>{
      if(authState.loggedIn){
      axios.post(`http://127.0.0.1:8000/api/answer/${answer.id}/downvote/`)
      .then((response) => {
          console.log(response.data);
      }).catch((error) => {
          console.error("Error fetching data:", error);
      });
    }
    }

      //*Submit reply-----------------------------------
      const [replybox, setReplybox] = useState('');

      const givanswer = (event) => {
        setReplybox(event.target.value);
      };

      const submitReply = (id) =>{
        axios.post(`http://127.0.0.1:8000/api/answer/${id}/reply/`,{reply:replybox})
        .then((response) => {
            console.log(response.data);
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
        });
      }

      //*Edit Answer------------------------------------
      const [editbox, setEditbox] = useState('');

      const giveedit = (event) => {
        setEditbox(event.target.value);
      };

      const submitEdit = (id) =>{
        axios.patch(`http://127.0.0.1:8000/api/answer/${id}/edit/`,{answer:editbox})
        .then((response) => {
            console.log(response.data);
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
        });
      }


      //*Toggle Boxes--------------------------
      const [replyOn,setReplyOn] = useState(false)
      const [editOn,setEditOn] = useState(false)

      //*Delete Comment----------------------
      const DeleteComment = () =>{
      axios.delete(`http://127.0.0.1:8000/api/answer/${answer.id}/delete/`)
      .then((response) => {
          console.log(response.data);
      })
      .catch((error) => {
          console.error("Error fetching data:", error);
      });
    }

      //*Accept----------------------------------
          const accept = () =>{
            axios.post(`http://127.0.0.1:8000/api/discussion-forum/${id}/answer/${answer.id}/accept/`)
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
          }

      return (

        <div className={`flex mb-8`}>
        <div className={`w-16 `}>
        {(authState.loggedIn) &&(authState.id===answer.user.id) &&(
            <div className={`w-10 h-10 text-xl flex justify-center items-center  rounded-full mb-2 ${answer.is_accepted? `bg-green-500`:`${colorState.box1color} hover:bg-gray-400`}`} onClick={accept}><AiOutlineCheck/></div>
          )}
          <div className={`w-10 h-10 text-xl flex justify-center items-center  rounded-full ${answer.user_vote==="up"? `${colorState.box2color}`:`${colorState.box1color} hover:bg-gray-400`}`} onClick={upvote}> <AiOutlineCaretUp/></div>
          <div className={`w-10 h-10 text-xl flex justify-center items-center  ${answer.user_vote!=null?`${colorState.textcolor2}`:``}`}>{answer.vote}</div>
          <div className={`w-10 h-10 text-xl flex justify-center items-center  rounded-full ${answer.user_vote==="down"? `${colorState.box2color}`:`${colorState.box1color} hover:bg-gray-400`}`} onClick={downvote}><AiOutlineCaretDown/></div>
        </div>
        <div className={`ml-4 w-full`}>
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
        { (authState.loggedIn)&&(
        <div className="flex mb-2">
        
            <div className={` w-40 h-10 rounded-md ${colorState.box1color} ${colorState.textcolor2}  flex justify-center items-center hover:bg-gray-400 mr-2`} onClick={()=>{setReplyOn(prevState => !prevState); setEditOn(false);}}>
                Reply
            </div>

           { (authState.id===answer.user.id) &&(<div className="flex">
              <div className={` w-40 h-10 rounded-md ${colorState.box1color} ${colorState.textcolor2}  flex justify-center items-center hover:bg-gray-400 mr-2`} onClick={()=>{setEditOn(prevState => !prevState);  setReplyOn(false);}}>
                    Edit
                </div>
                <div className={` w-40 h-10 rounded-md ${colorState.box1color} ${colorState.textcolor2}  flex justify-center items-center hover:bg-gray-400`}  onClick={()=>{DeleteComment()}}>
                    Delete
                </div>
            </div>)}

        </div>)}

{/* reply ------------ */}{
            replyOn && (<div className="flex mb-2">
                <input className={`w-full h-10 rounded-lg p-4 ${colorState.box1color}  font-roboto  ${colorState.textcolor}  text-xl `}
                value={replybox}
                onChange={givanswer} />
                <div className={`ml-2 w-40 h-10 rounded-md ${colorState.box1color}  text-xl flex justify-center items-center hover:bg-gray-400`} onClick={()=>{submitReply(answer.id)}}>
                  Reply
                </div>
            </div>)
            }
{/* edit ------------ */}
{   editOn && (<div className="flex mb-2">
            <input className={`w-full h-10 rounded-lg p-4 ${colorState.box1color}  font-roboto  ${colorState.textcolor}  text-xl `}
                value={editbox}
                onChange={giveedit} />
                <div className={`ml-2 w-40 h-10 rounded-md ${colorState.box1color}  text-xl flex justify-center items-center hover:bg-gray-400`} onClick={()=>{submitEdit(answer.id)}}>
                  Edit
                </div>
            </div>)}

            <div className={`ml-10`}>
                  {
                    (answer.reply!=null)&&(answer.reply.map((reply, index) => (
                      <Reply reply={reply} />
                  )))
                  }
            </div>
        </div>
      </div>
      );
    };


    const Reply = ({ reply }) => { 
      const [colorState,setColorState]= useContext(ColorContext);
      const [authState,setAuthState] = useContext(AuthContext);


            //*Edit Answer------------------------------------
            const [editbox, setEditbox] = useState('');

            const giveedit = (event) => {
              setEditbox(event.target.value);
            };
      
            const submitEdit = (id) =>{
              axios.patch(`http://127.0.0.1:8000/api/reply/${id}/edit/`,{reply:editbox})
              .then((response) => {
                  console.log(response.data);
              })
              .catch((error) => {
                  console.error("Error fetching data:", error);
              });
            }

            //*Toggle Boxes--------------------------
   
             const [editOn,setEditOn] =useState(false)

             //*Delete Comment----------------------
             const DeleteComment = () =>{
              axios.delete(`http://127.0.0.1:8000/api/reply/${reply.id}/delete/`)
              .then((response) => {
                  console.log(response.data);
              })
              .catch((error) => {
                  console.error("Error fetching data:", error);
              });
            }

      return (
        <div className={` mb-5`}>
        <div>
          <div className={`flex`}>
            <div className={`flex items-center `}>
              <div className={`mr-3 `}> <FaUserCircle /></div> {reply.user.first_name+" "+reply.user.last_name}</div>
            <div className="flex"><div className="mr-2 ml-5">replied</div>{calculateTimeDifference(reply.created_at)}</div>
          </div>
          <div>{reply.reply}</div>
        </div>
        {(authState.loggedIn) &&(authState.id===reply.user.id) &&(
        <div className="flex mb-2">
          <div className={` w-40 h-10 rounded-md ${colorState.box1color} ${colorState.textcolor2}  flex justify-center items-center hover:bg-gray-400 mr-2`} onClick={()=>{setEditOn(prevState => !prevState);}}>
                Edit
            </div>
            <div className={` w-40 h-10 rounded-md ${colorState.box1color} ${colorState.textcolor2}  flex justify-center items-center hover:bg-gray-400`} onClick={()=>{DeleteComment()}}>
                Delete
            </div>
        </div>)}{
            editOn && (<div className="flex mb-2">
              <input className={`w-full h-10 rounded-lg p-4 ${colorState.box1color}  font-roboto  ${colorState.textcolor}  text-xl `}
                value={editbox}
                onChange={giveedit} />
                <div className={`ml-2 w-40 h-10 rounded-md ${colorState.box1color}  text-xl flex justify-center items-center hover:bg-gray-400`} onClick={()=>{submitEdit(reply.id)}}>
                  Edit
                </div>
            </div>)
          }
      </div>
      );
    };
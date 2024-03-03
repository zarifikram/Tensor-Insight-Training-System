// Popup.js
import { AuthContext } from "../helpers/AuthContext";
import { ColorContext } from "../helpers/ColorContext";
import { EnvVariableContext } from "../helpers/EnvVariableContext";
import react,{ useContext } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ProblemPopUp from "../../unused/ProblemPopUp";
import { useRef } from "react";
import { FaUserCircle } from "react-icons/fa";
import { AiOutlineCaretUp } from "react-icons/ai";
import { AiOutlineCaretDown } from "react-icons/ai";

import CodePane from "../CodePane";
import { RxCross2 } from "react-icons/rx";//<RxCross2/>
import { IoMdCheckmark } from "react-icons/io";//<IoMdCheckmark />
//import Discussion from "./Discussion";
import Cookies from "js-cookie";

import { useState } from "react";
axios.defaults.withCredentials= true;

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

const DiscussionList = ({id}) => {
  const [envVariables,setEnvVariables] = useContext(EnvVariableContext);

  useEffect(() => {
    //set axios csrf header
  //  axios.defaults.headers.common['X-CSRFToken'] = Cookies.get('csrf');

  }, []);
   
    const [colorState,setColorState]= useContext(ColorContext);
    const [authState,setAuthState] = useContext(AuthContext);
  //   const [discussionList,setDiscussionList] = useState([
  //   {
  //     "id": 1,
  //     "title": "tt",
  //     "description": "ttt",
  //     "created_at": "2024-02-20T18:34:37.590938Z",
  //     "is_resolved": true,
  //     "user": {
  //         "id": 3,
  //         "first_name": "Anamul ",
  //         "last_name": "Hoque"
  //     },
  //     "answers": [
  //         {
  //             "id": 2,
  //             "answer": "ta",
  //             "created_at": "2024-02-20T18:47:55.633753Z",
  //             "user": {
  //                 "id": 3,
  //                 "first_name": "Anamul ",
  //                 "last_name": "Hoque"
  //             },
  //             "is_accepted": true,
  //             "reply": [
  //                 {
  //                     "id": 2,
  //                     "reply": "test reply",
  //                     "created_at": "2024-02-21T18:18:54.523098Z",
  //                     "user": {
  //                         "id": 3,
  //                         "first_name": "Anamul ",
  //                         "last_name": "Hoque"
  //                     }
  //                 }
  //             ],
  //             "vote": -2,
  //             "user_vote": "down"
  //         },
  //         {
  //             "id": 7,
  //             "answer": "dfgdfgd",
  //             "created_at": "2024-02-25T10:43:27.772711Z",
  //             "user": {
  //                 "id": 6,
  //                 "first_name": "saif",
  //                 "last_name": "hafiz"
  //             },
  //             "is_accepted": false,
  //             "reply": null,
  //             "vote": -1,
  //             "user_vote": "down"
  //         }
  //     ],
  //     "vote": 2,
  //     "user_vote": "up"
  // }
  // ])
  const [discussionList,setDiscussionList] = useState([]);

  //-------------for later use
  const [isPopupOpen, setPopupOpen] = useState(false);
  
  

  const openPopup = () => {
      setPopupOpen(true)
      
  };
  
  const closePopup = () => {
    setPopupOpen(false)
  };
  //-------------for later use

  useEffect(() => {
    const interval = setInterval(() => {
        console.log(authState)
        console.log("loading comments: "+id);
        axios.get(`${envVariables.backendDomain}api/problem/${id}/discussion-list/`)
            .then((response) => {
                console.log(response.data);
                setDiscussionList(response.data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, 1000); // Run every second (1000 milliseconds)

    // Clean up the interval when the component unmounts or when the dependency changes
    return () => clearInterval(interval);
}, [id]); // Empty dependency array

      const enterDiscussion = (id) =>{

      }

      const [comment,setComment] = useState("");

      const postComment = () =>{
        axios.post(`${envVariables.backendDomain}api/problem/${id}/add-discussion/`,{
          comment:comment
        })
        .then((response) => {
          console.log(response.data);
        }).catch((error) => {
            console.error("Error fetching data:", error);
        });
      }

    //*Voting-------------------------------------------------------
    const upvote = (id) =>{
      axios.post(`${envVariables.backendDomain}api/discussion/${id}/upvote/`)
      .then((response) => {
          console.log(response.data);
      }).catch((error) => {
          console.error("Error fetching data:", error);
      });
    }

    const downvote = (id) =>{
      axios.post(`${envVariables.backendDomain}api/discussion/${id}/downvote/`)
      .then((response) => {
          console.log(response.data);
      }).catch((error) => {
          console.error("Error fetching data:", error);
      });
    }

    return (
    <div className={` ${colorState.textcolor} font-roboto`}>
      <div className={`${authState.loggedIn?``:`hidden`} flex mb-2`}>
        <input type="text" placeholder="write something ..." value={comment} onChange={(e) => setComment(e.target.value)} className={`w-90% h-10   pl-4 flex items-center  ${colorState.box1color} rounded-md hover:bg-gray-400 `}></input>
        <div onClick={postComment} className={`h-10 w-10% ${colorState.box1color} ml-2 rounded-md hover:bg-gray-400 flex justify-center items-center hover:cursor-pointer`}>Comment</div>
      </div>
              {discussionList.map(comment => (<div className={`flex`}>
                <div className={`pt-2 mr-2`}>
                  <div className={`h-7 w-7 flex justify-center items-center rounded-full hover:bg-gray-400 ${comment.user_vote==="up"? `${colorState.box2color}`:`${colorState.box1color}`}`} onClick={()=>{upvote(comment.id)}}><AiOutlineCaretUp/></div>
                  <div className={`h-7 w-7 flex justify-center items-center `}>{comment.vote}</div>
                  <div className={`h-7 w-7 flex justify-center items-center rounded-full hover:bg-gray-400 ${comment.user_vote==="down"? `${colorState.box2color}`:`${colorState.box1color}`}`} onClick={()=>{downvote(comment.id)}}><AiOutlineCaretDown/></div>
                </div>
                <Comment key={comment.id} comment={comment} parent={true}/>
                </div>
              ))}
                
    </div>
  );
};


const Comment = ({ comment ,parent}) => {

  const [colorState,setColorState]= useContext(ColorContext);
  const [authState,setAuthState] = useContext(AuthContext);
  const [envVariables,setEnvVariables] = useContext(EnvVariableContext)
  const [replying,setReplying] =useState(false);
  const [replyText, setReplyText] = useState("Write Your Opinion ...");
  const [editing,setEditing] =useState(false);
  const [editText, setEditText] = useState(comment.comment);


  const handleEditChange = (event) => {
    setEditText(event.target.value);
  };


  const toggleEdit = () =>{
    setEditing(prevIsEditing => !prevIsEditing);
    setEditText(comment.comment)
  }

  const EditComment = () =>{
    toggleEdit();
    axios.patch(`${envVariables.backendDomain}api/discussion/${comment.id}/edit/`,{
      comment:editText
    }).then((response) => {
        console.log(response.data);
    })
    .catch((error) => {
        console.error("Error fetching data:", error);
    });
  }

  const handleReplyChange = (event) => {
    setReplyText(event.target.value);
  };


  const toggleReply = () =>{
    setReplying(prevIsReplying => !prevIsReplying);
  }

  const DeleteComment = () =>{
    axios.delete(`${envVariables.backendDomain}api/discussion/${comment.id}/delete/`)
    .then((response) => {
        console.log(response.data);
    })
    .catch((error) => {
        console.error("Error fetching data:", error);
    });
  }

  const submitReply = () =>{
    toggleReply();
    console.log(replyText);
            axios.post(`${envVariables.backendDomain}api/discussion/${comment.id}/reply/`,{comment:replyText})
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });

            setReplyText("");
  }




      //*Voting-------------------------------------------------------
      const upvote = (id) =>{
        if(authState.loggedIn){
        axios.post(`${envVariables.backendDomain}api/discussion/${id}/upvote/`)
        .then((response) => {
            console.log(response.data);
        }).catch((error) => {
            console.error("Error fetching data:", error);
        });
      }
      }
  
      const downvote = (id) =>{
        if(authState.loggedIn){
        axios.post(`${envVariables.backendDomain}api/discussion/${id}/downvote/`)
        .then((response) => {
            console.log(response.data);
        }).catch((error) => {
            console.error("Error fetching data:", error);
        });
      }
      }

  return (<div className={`flex `}>



<div  className={` w-100%  rounded-md   pt-2`}>
  <div className={`flex justify-start`}>
    <div className={`flex items-center `}><FaUserCircle /></div>
    <div className={`pl-3 flex items-center ${colorState.textcolor2}`}>{comment.user.first_name+" "+comment.user.last_name}</div>
    <div>{parent&&(<div className={`ml-5 mr-2`}>commented at</div>)  } {(!parent)&&(<div className={`ml-5 mr-2`}>replied at</div>)  }</div>
    <div>{calculateTimeDifference(comment.created_at)}</div>
  </div>
  <div className={`flex w-full`}> 
    <div className={`w-2 flex-shrink-0 ${colorState.box1color} mx-1 rounded-full hover:bg-gray-400`}></div>
    <div className={`w-full pl-1`}>{comment.comment}
    <div className={`flex pt-2`}>
      <div className={`${(authState.loggedIn)?`py-2 px-3  ${colorState.box1color} rounded-md hover:bg-gray-400 hover:cursor-pointer`:`hidden`}`} onClick={toggleReply}>Reply</div>
      <div className={`${(authState.loggedIn && authState.id==comment.user.id)?`py-2 px-3 ml-2 ${colorState.box1color} rounded-md hover:bg-gray-400 hover:cursor-pointer`:`hidden`}`} onClick={toggleEdit}>Edit</div>
      <div className={`${(authState.loggedIn && authState.id==comment.user.id)?`py-2 px-3 ml-2 ${colorState.box1color} rounded-md hover:bg-gray-400 hover:cursor-pointer`:`hidden`}`} onClick={DeleteComment}>Delete</div>
     { !parent && (<div className={`flex items-center ml-2`}>
      <div className={`h-7 w-7 flex justify-center items-center rounded-full hover:bg-gray-400 ${comment.user_vote==="up"? `${colorState.box2color}`:`${colorState.box1color}`}`} onClick={()=>{upvote(comment.id)}}><AiOutlineCaretUp/></div>
      <div className={`h-7 w-7 flex justify-center items-center `}>{comment.vote}</div>
      <div className={`h-7 w-7 flex justify-center items-center rounded-full hover:bg-gray-400 ${comment.user_vote==="down"? `${colorState.box2color}`:`${colorState.box1color}`}`} onClick={()=>{downvote(comment.id)}}><AiOutlineCaretDown/></div>   
      </div>)}
    </div>
    <div className={`${replying?`pl-0 flex pt-2`:`hidden`}`}>
      <div className={`w-2 flex-shrink-0 ${colorState.box1color} mx-1 rounded-full`}></div>
      <textarea  name="w3review" rows="4"  className={`w-full ${colorState.box1color}  px-2 ml-2 rounded-md w-full `}
      onFocus={(event) => event.target.value === 'Write Your Opinion ...' && (event.target.value = '')}
      value={replyText}
      onChange={handleReplyChange}
      >
    </textarea>
    </div>
    <div className={`${editing?`pl-0 flex pt-2`:`hidden`}`}>
      <div className={`w-2 flex-shrink-0 ${colorState.box1color} mx-1 rounded-full`}></div>
      <textarea  name="w3review" rows="4"  className={`w-full ${colorState.box1color}  px-2 ml-2 rounded-md w-full `}
      value={editText}
      onChange={handleEditChange}
      >
      
    </textarea>
    </div>
    <div className={`${replying?`mt-2 py-2 px-3  ${colorState.box2color} rounded-md hover:bg-gray-400 hover:cursor-pointer w-20`:`hidden`}`} onClick={submitReply}>Submit</div>
    <div className={`${editing?`mt-2 py-2 px-3  ${colorState.box2color} rounded-md hover:bg-gray-400 hover:cursor-pointer w-20`:`hidden`}`} onClick={EditComment}>Submit</div>
          {comment.replies.map(reply => (
            <Comment key={reply.id} comment={reply} parent={false}/>
          ))}
    
    </div>
  </div>
</div>  



</div>
  );
};

export default DiscussionList;

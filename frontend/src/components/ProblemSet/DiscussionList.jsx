// Popup.js
import { AuthContext } from "../helpers/AuthContext";
import { ColorContext } from "../helpers/ColorContext";
import react,{ useContext } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ProblemPopUp from "../../unused/ProblemPopUp";
import { useRef } from "react";
import { FaUserCircle } from "react-icons/fa";

import CodePane from "../CodePane";
import { RxCross2 } from "react-icons/rx";//<RxCross2/>
import { IoMdCheckmark } from "react-icons/io";//<IoMdCheckmark />
//import Discussion from "./Discussion";
import Cookies from "js-cookie";

import { useState } from "react";
axios.defaults.withCredentials= true;

const DiscussionList = ({id}) => {

  useEffect(() => {
    //set axios csrf header
  //  axios.defaults.headers.common['X-CSRFToken'] = Cookies.get('csrf');

  }, []);
   
    const [colorState,setColorState]= useContext(ColorContext);
    const [authState,setAuthState] = useContext(AuthContext);
  //   const [discussionList,setDiscussionList] = useState([
  //     {
  //         "id": 10,
  //         "user": {
  //             "id": 4,
  //             "first_name": "saif",
  //             "last_name": "hafiz",
  //             "level": 0,
  //             "xp": 135,
  //             "image": null
  //         },
  //         "comment": "comment 2",
  //         "timestamp": "2024-02-09 16:34:05",
  //         "vote": 0,
  //         "replies": [
  //             {
  //                 "id": 11,
  //                 "user": {
  //                     "id": 4,
  //                     "first_name": "saif",
  //                     "last_name": "hafiz",
  //                     "level": 0,
  //                     "xp": 135,
  //                     "image": null
  //                 },
  //                 "comment": "test reply",
  //                 "timestamp": "2024-02-09 17:20:58",
  //                 "vote": 0,
  //                 "replies": [
  //                     {
  //                         "id": 12,
  //                         "user": {
  //                             "id": 4,
  //                             "first_name": "saif",
  //                             "last_name": "hafiz",
  //                             "level": 0,
  //                             "xp": 135,
  //                             "image": null
  //                         },
  //                         "comment": "test reply's reply",
  //                         "timestamp": "2024-02-09 17:21:47",
  //                         "vote": 0,
  //                         "replies": []
  //                     },
  //                     {
  //                       "id": 13,
  //                       "user": {
  //                           "id": 4,
  //                           "first_name": "saif",
  //                           "last_name": "hafiz",
  //                           "level": 0,
  //                           "xp": 135,
  //                           "image": null
  //                       },
  //                       "comment": "test reply's reply 11",
  //                       "timestamp": "2024-02-09 17:21:47",
  //                       "vote": 0,
  //                       "replies": []
  //                   }
  //                 ]
  //             }
  //         ]
  //     },
  //     {
  //         "id": 9,
  //         "user": {
  //             "id": 4,
  //             "first_name": "saif",
  //             "last_name": "hafiz",
  //             "level": 0,
  //             "xp": 135,
  //             "image": null
  //         },
  //         "comment": "comment 1",
  //         "timestamp": "2024-02-09 16:33:55",
  //         "vote": 0,
  //         "replies": []
  //     },
  //     {
  //         "id": 1,
  //         "user": {
  //             "id": 2,
  //             "first_name": "test",
  //             "last_name": "user",
  //             "level": 0,
  //             "xp": 69,
  //             "image": null
  //         },
  //         "comment": "test discussion",
  //         "timestamp": "2024-01-27 19:08:45",
  //         "vote": 1,
  //         "replies": []
  //     }
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
        axios.get(`http://127.0.0.1:8000/api/problem/${id}/discussion-list/`)
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
        axios.post(`http://127.0.0.1:8000/api/problem/${id}/add-discussion/`,{
          comment:comment
        })
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
              {discussionList.map(comment => (
                <Comment key={comment.id} comment={comment} />
              ))}
                
    </div>
  );
};


const Comment = ({ comment }) => {

  const [colorState,setColorState]= useContext(ColorContext);
  const [authState,setAuthState] = useContext(AuthContext);
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
    axios.patch(`http://127.0.0.1:8000/api/discussion/${comment.id}/edit/`,{
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
    axios.delete(`http://127.0.0.1:8000/api/discussion/${comment.id}/delete/`)
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
            axios.post(`http://127.0.0.1:8000/api/discussion/${comment.id}/reply/`,{comment:replyText})
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });

            setReplyText("");
  }

  return (<div>
<div  className={` w-100%  rounded-md   pt-2`}>
  <div className={`flex justify-start`}>
    <div className={`flex items-center `}><FaUserCircle /></div>
    <div className="pl-3 flex items-center">{comment.user.first_name+" "+comment.user.last_name}</div>
  </div>
  <div className={`flex w-full`}> 
    <div className={`w-2 flex-shrink-0 ${colorState.box1color} mx-1 rounded-full hover:bg-gray-400`}></div>
    <div className={`w-full pl-1`}>{comment.comment}
    <div className={`flex pt-2`}>
      <div className={`${(authState.loggedIn)?`py-2 px-3  ${colorState.box1color} rounded-md hover:bg-gray-400 hover:cursor-pointer`:`hidden`}`} onClick={toggleReply}>Reply</div>
      <div className={`${(authState.loggedIn && authState.id==comment.user.id)?`py-2 px-3 ml-2 ${colorState.box1color} rounded-md hover:bg-gray-400 hover:cursor-pointer`:`hidden`}`} onClick={toggleEdit}>Edit</div>
      <div className={`${(authState.loggedIn && authState.id==comment.user.id)?`py-2 px-3 ml-2 ${colorState.box1color} rounded-md hover:bg-gray-400 hover:cursor-pointer`:`hidden`}`} onClick={DeleteComment}>Delete</div>
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
            <Comment key={reply.id} comment={reply} />
          ))}
    
    </div>
  </div>
</div>  



</div>
  );
};

export default DiscussionList;

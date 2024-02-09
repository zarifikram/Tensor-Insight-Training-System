// Popup.js
import { AuthContext } from "../helpers/AuthContext";
import { ColorContext } from "../helpers/ColorContext";
import react,{ useContext } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ProblemPopUp from "../../unused/ProblemPopUp";
import { useRef } from "react";

import CodePane from "../CodePane";
import { RxCross2 } from "react-icons/rx";//<RxCross2/>
import { IoMdCheckmark } from "react-icons/io";//<IoMdCheckmark />
import Discussion from "./Discussion";
import Cookies from "js-cookie";

import { useState } from "react";
axios.defaults.withCredentials= true;

const DiscussionList = ({id}) => {

  useEffect(() => {
    //set axios csrf header
    axios.defaults.headers.common['X-CSRFToken'] = Cookies.get('csrf');
  }, []);
   
    const [colorState,setColorState]= useContext(ColorContext);
    const [authState,setAuthState] = useContext(AuthContext);
    const [discussionList,setDiscussionList] = useState([
        {
          "id": 1,
          "user": {
              "id": 2,
              "first_name": "test",
              "last_name": "user",
              "level": 0,
              "xp": 69,
              "image": null
          },
          "comment": "test discussion",
          "timestamp": "2024-01-27 19:08:45",
          "vote": 1,
          "replies": []
        }
      ])

  const [isPopupOpen, setPopupOpen] = useState(true);
  
  

  const openPopup = () => {
      setPopupOpen(true)
      
  };
  
  const closePopup = () => {
    setPopupOpen(false)
  };

  useEffect(() => {
    const interval = setInterval(() => {
        console.log("loading comments");
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
}, []); // Empty dependency array

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
                       {Array.from({ length: discussionList.length }, (_, index) => (    
                <div className={` `} onClick={() => enterDiscussion(discussionList[index].id)}>
                  <div  className={`${(index+1)%2===1 ?`${colorState.box1color} w-100% flex justify-between rounded-md hover:bg-gray-400 hover:rounded-md py-2`:`w-100% flex justify-start hover:bg-gray-400 hover:rounded-md py-2`}`}>
                    <div className={`flex justify-start`}>
                      <div className="pl-3">{discussionList[index].comment}</div>
                    </div>
                  </div>  
                </div>
                ))}   

                <Discussion isOpen={isPopupOpen}  onClose={closePopup}></Discussion>
    </div>
  );
};

export default DiscussionList;

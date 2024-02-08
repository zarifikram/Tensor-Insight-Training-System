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

const DiscussionList = ({id}) => {
   
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

    const [isPopupOpen, setPopupOpen] = useState(false);
    const [currentPage,setCurrentPage] = useState(0);
  

  const openPopup = (page) => {
      console.log("pop");
      
  };
  
  const closePopup = () => {
     
  };

      useEffect(() => {
        console.log("loading comments")
        axios.get(`http://127.0.0.1:8000/api/problem/1/discussion-list/`)
        .then((response) => {
        console.log(response.data);
        setDiscussionList(response.data)
        }).catch((error) => {
            console.error("Error fetching data:", error);
        });
   
      }, []);

      const enterDiscussion = (id) =>{

      }


    return (
    <div className={` ${colorState.textcolor} font-roboto`}>
                       {Array.from({ length: discussionList.length }, (_, index) => (    
                <div className={` `} onClick={() => enterDiscussion(discussionList[index].id)}>
                    <div  className={`${(index+1)%2===1 ?`${colorState.box1color} w-100% flex justify-start rounded-md hover:bg-gray-400 hover:rounded-md py-2`:`w-100% flex justify-start hover:bg-gray-400 hover:rounded-md py-2`}`}>
                          <div className="pl-3">{discussionList[index].id}</div>
                          <div className="pl-3">{discussionList[index].comment}</div>
                    </div>
                </div>
                ))}   
    </div>
  );
};

export default DiscussionList;

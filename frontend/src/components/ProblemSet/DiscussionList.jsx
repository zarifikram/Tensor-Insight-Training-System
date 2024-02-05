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
    const [discussionList,setDiscussionList] = useState()

    const [isPopupOpen, setPopupOpen] = useState(false);
    const [currentPage,setCurrentPage] = useState(0);
  

  const openPopup = (page) => {
      console.log("pop");
      
  };
  
  const closePopup = () => {
     
  };

      useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/problem/${id}/discussion-list/`)
        .then((response) => {
        console.log(response.data);
        setDiscussionList(response.data)
        }).catch((error) => {
            console.error("Error fetching data:", error);
        });
   
      }, []);


    return (
    <div className={` ${colorState.textcolor} font-roboto`}>
      
    </div>
  );
};

export default DiscussionList;

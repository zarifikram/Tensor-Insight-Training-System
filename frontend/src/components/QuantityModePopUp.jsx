// Popup.js
import { AuthContext } from "./helpers/AuthContext";
import react,{ useContext } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";//<RxCross2/>
import { IoMdCheckmark } from "react-icons/io";//<IoMdCheckmark />
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosCloseCircle } from "react-icons/io";
import { IoIosCheckmarkCircle } from "react-icons/io";

import { useState } from "react";

const QuantityModePopUp = ({ isOpen, onClose,currentPage, setCurrentPage, children }) => {
    const [authState,setAuthState]= useContext(AuthContext);
    let m1="[[1, 2, 3]], [4, 1, 2], [2, 1, 5]]";
    let m2="[[1], [2], [5]]";
    let m3="[[1], [1], [5]]";

    // const [currentPage, setCurrentPage] = useState(0);

    const pages = [
      {
        inputTensor: "[[1, 2, 3]], [4, 1, 2], [2, 1, 5]]",
        expectedTensor: "[[1], [2], [5]]",
        currentTensor: "[[1], [2], [5]]",
        reached:true
      },
      {
        inputTensor: "[[5, 2, 4]], [2, 1, 2], [1, 1, 5]]",
        expectedTensor: "[[2], [1], [4]]",
        currentTensor: "[[4], [5], [6]]",
        reached:false
      },
      {
        inputTensor: "[[3, 2, 3]], [4, 5, 2], [2, 6, 5]]",
        expectedTensor: "[[3], [3], [1]]",
        currentTensor: "[[3], [3], [1]]",
        reached:true
      },
      {
        inputTensor: "[[9, 9, 0]], [3, 1, 2], [3, 4, 5]]",
        expectedTensor: "[[8], [2], [1]]",
        currentTensor: "[[8], [2], [1]]",
        reached:true
      },
      {
        inputTensor: "[[3, 2, 3]], [4, 5, 2], [2, 6, 5]]",
        expectedTensor: "[[3], [3], [1]]",
        currentTensor: "[[2], [2], [2]]",
        reached:false
      },
    ];

    const handleNavigation = (direction) => {
      if (direction === "prev") {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
      } else if (direction === "next") {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, pages.length-1));
      }
    };

    const handleClose = (e) => {
    // Close the popup only if the overlay is clicked
        if (e.target.classList.contains('overlay')) {
            onClose();
        }
    };


    return (
    <>
      <div
        className={`fixed inset-0 overflow-y-auto transition-opacity duration-300 
        ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={handleClose} // Added onClick event for the entire popup
        >
        <div className="flex items-center justify-center min-h-screen">
          <div className="overlay fixed inset-0 bg-black opacity-50"></div>
          <div className={` z-40 ${authState.bgcolor} ${authState.textcolor} p-4 max-w-screen-lg w-50% mx-auto rounded-md shadow-md transition-transform  transform duration-300 `} >
            <div className={`mx-16 font-roboto `} >
              <div>
                <div className={` h-16 flex items-end text-2xl font-bold pb-2.5`}>Input Tensor</div>
                <div className={`${authState.box1color} h-16 flex justify-start items-center text-base font-extrabold pl-9 rounded-lg`}>t1 = {pages[currentPage].inputTensor}</div>
              </div>
              <div>
                <div className={` h-20 flex items-end text-2xl font-bold pb-2.5`}>Expected Tensor</div>
                <div className={`${authState.box1color} h-16 flex justify-start items-center text-base font-extrabold pl-9 rounded-lg`}>t1 = {pages[currentPage].expectedTensor}</div>
              </div>
              <div >
                <div className={` h-14 flex items-end text-2xl font-bold pb-2.5 `}>Current Tensor <IoIosCloseCircle className={`text-red-600 ${pages[currentPage].reached? `hidden`:``}`}/><IoIosCheckmarkCircle className={`text-green-600 ${pages[currentPage].reached? ``:`hidden`}`}/>  </div>
                <div className={`${authState.box1color} h-16 flex justify-start items-center text-base font-extrabold pl-9 rounded-lg`}>t1 = {pages[currentPage].currentTensor}</div>
              </div>
            </div>
            <div className={`mx-16 flex justify-center items-end h-16 py-1`}>
              <div className={`h-2 w-2  ${currentPage === 0 ? `${authState.box2color}`:`${authState.box3color}`} rounded-full mx-1 `}></div>
              <div className={`h-2 w-2  ${currentPage === 1 ? `${authState.box2color}`:`${authState.box3color}`} rounded-full mx-1 `}></div>
              <div className={`h-2 w-2  ${currentPage === 2 ? `${authState.box2color}`:`${authState.box3color}`} rounded-full mx-1 `}></div>
              <div className={`h-2 w-2  ${currentPage === 3 ? `${authState.box2color}`:`${authState.box3color}`} rounded-full mx-1 `}></div>
              <div className={`h-2 w-2  ${currentPage === 4 ? `${authState.box2color}`:`${authState.box3color}`} rounded-full mx-1 `}></div>
            </div>
            <div className={`mx-8 h-8 mt-3 mb-1 ${authState.box1color} hover:bg-gray-400 rounded-lg text-xl font-bold flex justify-center items-center`} onClick={onClose}>
              OK
            </div>
            {/*
            <button className={`${authState.textcolor2} absolute top-2 right-2  hover:text-gray-400`} onClick={onClose}>
            <AiOutlineCloseCircle /> 
            </button>*/
            }

          </div>
          <button
              className={`z-50 ${authState.textcolor2} absolute top-80 left-lpop ${authState.box1color} hover:bg-gray-400 h-12 w-12 rounded-full flex items-center justify-center`}
              onClick={() => handleNavigation("prev")}
              disabled={currentPage === 0}
            >
              <IoIosArrowBack className="text-2xl" />
            </button>
            <button
              className={`z-50 ${authState.textcolor2} absolute top-80 right-lpop ${authState.box1color} hover:bg-gray-400 h-12 w-12 rounded-full flex items-center justify-center`}
              onClick={() => handleNavigation("next")}
              disabled={currentPage === pages.length-1}
            >
              <IoIosArrowForward className="text-2xl" />
            </button>
        </div>
      </div>
    </>
  );
};

export default QuantityModePopUp;

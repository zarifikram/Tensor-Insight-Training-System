import { AuthContext } from "./helpers/AuthContext";
import React, { useContext } from "react";

import CodePane from "./CodePane";
import { RxCross2 } from "react-icons/rx";//<RxCross2/>
import { IoMdCheckmark } from "react-icons/io";//<IoMdCheckmark />

const QuantityMode = () =>{
    const [authState,setAuthState]= useContext(AuthContext);

    let m1="[[1, 2, 3]], [4, 1, 2], [2, 1, 5]]";
    let m2="[[1], [1], [5]]";
    let m3="[[1, 2, 3]], [4, 1, 2], [2, 1, 5]]";

    return(
    <div className="mx-40">
        <div className=" h-24 flex justify-center py-4 items-center">
            <div className={` ${authState.box1color}  w-40% rounded-full font-bold text-2xl flex justify-evenly py-5 text-gray-700`}>

                <div className={`bg-green-600 rounded-full `}><IoMdCheckmark/></div>
                <div className={`bg-red-600 rounded-full `}><RxCross2/></div>
                <div className={`bg-green-600 rounded-full `}><IoMdCheckmark/></div>
                <div className={`bg-green-600 rounded-full `}><IoMdCheckmark/></div>
                <div className={`bg-red-600 rounded-full `}><RxCross2/></div>
            </div>
        </div>
        <CodePane/>
    </div>
    );
    
    };
    
    export default QuantityMode;
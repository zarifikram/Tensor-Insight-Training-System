import { AuthContext } from "./helpers/AuthContext";
import React, { useContext } from "react";

const QuantityMode = () =>{
    const [authState,setAuthState]= useContext(AuthContext);

    let m1="[[1, 2, 3]], [4, 1, 2], [2, 1, 5]]";
    let m2="[[1], [1], [5]]";
    let m3="[[1, 2, 3]], [4, 1, 2], [2, 1, 5]]";

    return(
    <div className="mx-40">
        <div className=" h-28 flex justify-between py-4">
            <div className={` ${authState.box1color} w-40% rounded-3xl font-bold ${authState.textcolor} text-2xl flex justify-center py-5`}>{m1}</div>
            <div className={` ${authState.box1color} w-40% rounded-3xl font-bold ${authState.textcolor} text-2xl flex justify-center py-5`}>{m2}</div>
        </div>
        <div className="  h-28 flex py-4">
            <div className={` ${authState.box1color} w-100% rounded-3xl font-bold ${authState.textcolor} text-2xl flex justify-center py-5`}>{m3}</div>
        </div>
        <div className={`py-20 ${authState.textcolor} font-roboto text-4xl font-bold`}>start typing your code . . .</div>
    </div>
    );
    
    };
    
    export default QuantityMode;
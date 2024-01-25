import { AuthContext } from "./helpers/AuthContext";
import React, { useContext } from "react";

const CodePane = () =>{
    const [authState,setAuthState]= useContext(AuthContext);
    return(
    <div>
        <div className={`pt-20 ${authState.textcolor2} font-roboto text-2xl font-bold`}>0/8</div>
        <div className={` ${authState.textcolor} font-roboto text-2xl font-bold`}>start typing your code . . .</div>
    </div>
    );
    
    };
    
    export default CodePane;
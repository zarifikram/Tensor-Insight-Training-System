import { AuthContext } from "../helpers/AuthContext";
import { ColorContext } from "../helpers/ColorContext";
import React, { useContext } from "react";
import { useState } from "react";
import axios from 'axios';
import { useEffect } from "react";

axios.defaults.withCredentials= true;

const Authentication = () =>{
    const [colorState,setColorState]= useContext(ColorContext);
    const [authState,setAuthState] = useContext(AuthContext);

    const [username,setUsername] = useState("");
    const [email,setEmail] = useState("");
    const [verifyEmail,setVerifyEmail] = useState("");
    const [password,setPassword] = useState("");
    const [verifyPassword,setVerifyPassword] = useState("");

    const [usernameLogin,setUsernameLogin] =useState("")
    const [emailLogin,setEmailLogin] =useState("")
 
    return(
    <div className="mx-40 font-roboto">
        <div className={`flex justify-end pt-32 ${colorState.textcolor} font-bold  text-lg`}>
            <div className={`w-50% flex justify-center items-center`}>
                <div className={`w-40%`}>
                    <div className={`h-10  mt-1 pl-4 flex items-center rounded-md ${colorState.captioncolor} text-lg`}>register</div>
                    <input type="text" placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)} className={`h-10   pl-4 flex items-center  ${colorState.box1color} rounded-md hover:bg-gray-400`}></input>
                    <input type="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} className={`h-10  mt-1 pl-4 flex items-center  ${colorState.box1color} rounded-md hover:bg-gray-400`}></input>
                    <input type="email" placeholder="verify email" value={verifyEmail} onChange={(e) => setVerifyEmail(e.target.value)} className={`h-10  mt-1 pl-4 flex items-center  ${colorState.box1color} rounded-md hover:bg-gray-400`}></input>
                    <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}  className={`h-10  mt-1 pl-4 flex items-center  ${colorState.box1color} rounded-md hover:bg-gray-400`}></input>
                    <input type="password" placeholder="verify password" value={verifyPassword} onChange={(e) => setVerifyPassword(e.target.value)} className={`h-10  mt-1 pl-4 flex items-center  ${colorState.box1color} rounded-md hover:bg-gray-400`}></input>
                    <div className={`h-10  mt-1 pl-4 flex items-center  ${colorState.box1color} rounded-md hover:bg-gray-400`}>Sign Up</div>
                </div>
            </div>
            <div className={`w-50%  flex justify-center items-center`}>
                <div className={`w-40%`}>
                <div className={`h-10  mt-1 pl-4 flex items-center rounded-md ${colorState.captioncolor} text-lg`}>login</div>
                    <input type="text" placeholder="username" value={usernameLogin} onChange={(e) => setUsernameLogin(e.target.value)} className={`h-10   pl-4 flex items-center  ${colorState.box1color} rounded-md hover:bg-gray-400`}></input>
                    <input  type="email" placeholder="email" value={emailLogin} onChange={(e) => setEmailLogin(e.target.value)} className={`h-10  mt-1 pl-4 flex items-center  ${colorState.box1color} rounded-md hover:bg-gray-400`}></input>
                    <div className={`h-10  mt-1 pl-4 flex items-center  ${colorState.box1color} rounded-md hover:bg-gray-400`}>Sign In</div>
                    <div className={`h-5   flex items-center justify-center text-sm `}>or</div>
                    <div className={`h-10  mt-1 pl-4 flex items-center  ${colorState.box1color} rounded-md hover:bg-gray-400`}>Google Sign In</div>
                </div>
            </div>
        </div>
    </div>
    );
    
    };
    
    export default Authentication;
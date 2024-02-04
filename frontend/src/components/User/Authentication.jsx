import { AuthContext } from "../helpers/AuthContext";
import { ColorContext } from "../helpers/ColorContext";
import React, { useContext } from "react";
import { useState } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';
import { useEffect } from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

axios.defaults.withCredentials= true;

const Authentication = () =>{
    const [colorState,setColorState]= useContext(ColorContext);
    const [authState,setAuthState] = useContext(AuthContext);

    const [username,setUsername] = useState("");
    const [email,setEmail] = useState("");
    const [firstname,setFirstname] = useState("");
    const [lastname,setLastname] = useState("");
    const [password,setPassword] = useState("");
    const [confirmpassword,setConfirmpassword] = useState("");

    const [usernameLogin,setUsernameLogin] =useState("")
    const [passwordLogin,setPasswordLogin] =useState("")

    const SignUp =()=>{
        console.log("signUp")
        axios.post(`http://127.0.0.1:8000/api/signup/`,{   
            username: username,
            email: email,
            first_name:firstname,
            last_name: lastname,
            password: password,
            confirm_password: confirmpassword})
        .then((response) => {
        console.log(response.data);
        toast.success(response.data.message);

        }).catch((error) => {
            console.log("error");
            console.error("Error fetching data:", error);
            toast.error("Could not create a user");
        });

    }


    const SignIn=()=>{
        axios.post(`http://127.0.0.1:8000/api/signin-with-email-password/`,{   
            username: usernameLogin,
            password: passwordLogin,
            }).then((response) => {
                
                console.log("You Have Successfully Logged In");
                toast.success("You Have Successfully Logged In");
                setAuthState({
                    quantityModeRunning:authState.quantityModeRunning,
                    timerModeRunning:authState.timerModeRunning,
                    loggedIn:true
                })
            }).catch((error) => {
                console.log("error");
                console.error("Error fetching data:", error);
                toast.error("Couldn't log in");
            });
    }




    const SignOut=()=>{
        console.log(document.cookie)
        axios.post(`http://127.0.0.1:8000/api/signout/`
        ).then((response) => {
                console.log("You Have Successfully Logged In");
                toast.success("Successfully Logged Out");
            }).catch((error) => {
                console.log("error");
                console.error("Error fetching data:", error);
                toast.error("Couldn't log Out");
            });
    }
 
    return(
    <div className="mx-40 font-roboto">
        <div className={` ${colorState.box1color} ${colorState.textcolor} rounded-md py-3 w-32  flex justify-center items-center hover:bg-gray-400 ` } onClick={SignOut}> sign out</div>
        <div className={`flex justify-end pt-32 ${colorState.textcolor} font-bold  text-lg`}>
            <div className={`w-50% flex justify-center items-center`}>
                <div className={`w-45%`}>
                    <div className={`w-100% h-10  mt-1 pl-4 flex items-center rounded-md ${colorState.captioncolor} text-lg`}>register</div>
                    <input type="text" placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)} className={`w-100% h-10   pl-4 flex items-center  ${colorState.box1color} rounded-md hover:bg-gray-400`}></input>
                    <input type="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} className={`w-100% h-10  mt-1 pl-4 flex items-center  ${colorState.box1color} rounded-md hover:bg-gray-400`}></input>
                    <input type="text" placeholder="firstname" value={firstname} onChange={(e) => setFirstname(e.target.value)} className={`w-100% h-10  mt-1 pl-4 flex items-center  ${colorState.box1color} rounded-md hover:bg-gray-400`}></input>
                    <input type="text" placeholder="lastname" value={lastname} onChange={(e) => setLastname(e.target.value)} className={`w-100% h-10  mt-1 pl-4 flex items-center  ${colorState.box1color} rounded-md hover:bg-gray-400`}></input>
                    <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}  className={`w-100% h-10  mt-1 pl-4 flex items-center  ${colorState.box1color} rounded-md hover:bg-gray-400`}></input>
                    <input type="password" placeholder="confirm password" value={confirmpassword} onChange={(e) => setConfirmpassword(e.target.value)} className={`w-100% h-10  mt-1 pl-4 flex items-center  ${colorState.box1color} rounded-md hover:bg-gray-400`}></input>
                    <div className={`h-10  mt-1 pl-4 flex items-center w-100% ${colorState.box1color} rounded-md hover:bg-gray-400`} onClick={SignUp}>Sign Up</div>
                </div>
            </div>
            <div className={`w-50%  flex justify-center items-center`}>
                <div className={`w-45%`}>
                <div className={`h-10  mt-1 pl-4 flex items-center rounded-md ${colorState.captioncolor} text-lg`}>login</div>
                    <input type="text" placeholder="username" value={usernameLogin} onChange={(e) => setUsernameLogin(e.target.value)} className={`w-100% h-10   pl-4 flex items-center  ${colorState.box1color} rounded-md hover:bg-gray-400`}></input>
                    <input  type="password" placeholder="password" value={passwordLogin} onChange={(e) => setPasswordLogin(e.target.value)} className={`w-100% h-10  mt-1 pl-4 flex items-center  ${colorState.box1color} rounded-md hover:bg-gray-400`}></input>
                    <div className={`h-10  mt-1 pl-4 flex items-center  ${colorState.box1color} rounded-md hover:bg-gray-400 w-100% `} onClick={SignIn}>Sign In</div>
                    <div className={`h-5   flex items-center justify-center text-sm w-100%`}>or</div>
                    <div className={`h-10  mt-1 pl-4 flex items-center  ${colorState.box1color} rounded-md hover:bg-gray-400 w-100%`}>Google Sign In</div>
                </div>
            </div>
        </div>
        <ToastContainer />
    </div>
    );
    
    };
    
    export default Authentication;
import { AuthContext } from "../helpers/AuthContext";
import { ColorContext } from "../helpers/ColorContext";
import React, { useContext } from "react";
import { EnvVariableContext } from "../helpers/EnvVariableContext";
import { useState } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';
import { useEffect } from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CSRFContext } from "../helpers/CSRFContext";
import Cookies from 'js-cookie';
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

axios.defaults.withCredentials = true;

const Authentication = () =>{
    const navigate=useNavigate();
    const [envVariables,setEnvVariables] = useContext(EnvVariableContext);
    // useEffect(() => {
    //     const csrfToken =  Cookies.get('csrf')
    //     console.log(csrfToken)
    //     console.log("authCookieTest")
    //     if (csrfToken) {
    //       axios.defaults.headers.common['X-CSRFToken'] =csrfToken;
    //     } else {
    //       axios.get('http://127.0.0.1:8000/api/get-csrftoken/')
    //       .then(response => {
    //       const csrfToken = response.data.csrftoken;
    //       console.log(csrfToken);
    //       axios.defaults.headers.common['X-CSRFToken'] = csrfToken;
    //       Cookies.set('csrf', csrfToken, { expires: 7 });
      
    //       })
    //       .catch(error => {
    //       console.error('Error fetching CSRF token:', error);
    //       });
    //       console.log("first time entry in the website");
    //     }
    // }, []);



    const [colorState,setColorState]= useContext(ColorContext);
    const [authState,setAuthState] = useContext(AuthContext);
    const  [ csrfState, setCSRFState]= useContext(CSRFContext);

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
        axios.post(`${envVariables.backendDomain}api/signup/`,{   
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
        axios.post(`${envVariables.backendDomain}api/signin-with-email-password/`,{   
            username: usernameLogin,
            password: passwordLogin,
            }).then((response) => {
                
                console.log(response.data);
                toast.success("You Have Successfully Logged In");
                setAuthState(prevState => ({
                    ...prevState,
                    loggedIn: true ,// or false to change the state to logged out
                    id: response.data.id, 
                  }));

                setCSRFToken();

                            axios.get(`${envVariables.backendDomain}api/user/${response.data.id}`
                            ).then((response) => {         
                                console.log(response.data);
                                setAuthState(prevState => ({
                                    ...prevState,
                                    id: response.data.id, 
                                    first_name: response.data.first_name,
                                    last_name: response.data.last_name,
                                    level: response.data.level, 
                                    xp: response.data.xp,
                                    image: response.data.image,
                                    username: response.data.username,
                                  }));
                            }).catch((error) => {
                                console.log("error");
                            });

                            navigate("/User")

            }).catch((error) => {
                console.log("error");
                console.error("Error fetching data:", error);
                toast.error("Couldn't log in");
            }).finally(() => {
                
            });

            
    }



const setCSRFToken = () => {
  axios.get(`${envVariables.backendDomain}api/get-csrftoken/`)
  .then(response => {
    const csrfToken = response.data.csrftoken;
    //console.log(csrfToken);
    axios.defaults.headers.common['X-CSRFToken'] = csrfToken;
    //Cookies.set('csrf', csrfToken, { expires: 7 });

  })
  .catch(error => {
    console.error('Error fetching CSRF token:', error);
  });
};




    const SignOut=()=>{
        axios.post(`${envVariables.backendDomain}api/signout/`
        ).then((response) => {
                console.log("You Have Successfully Logged Out");
                toast.success("Successfully Logged Out");
                setAuthState(prevState => ({
                    ...prevState,
                    loggedIn: false // or false to change the state to logged out
                  }));
                  
            }).catch((error) => {
                console.log("error");
                console.error("Error fetching data:", error);
                toast.error("Couldn't log Out");
            });
    }

    // useEffect(() => {
    //     console.log(authState);
    //     Cookies.set('authState', JSON.stringify(authState));
    //     console.log(Cookies.get('authState'))
    // }, [authState]);
 
    return(
    <div className="mx-40 font-roboto">{
        //<div className={` ${colorState.box1color} ${colorState.textcolor} rounded-md py-3 w-32  flex justify-center items-center hover:bg-gray-400 ` } onClick={SignOut}> sign out</div>
    }
        <div className={`flex justify-end pt-20 ${colorState.textcolor} font-bold  text-lg`}>
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
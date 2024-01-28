import React from "react";
import axios from 'axios';

// Create an Axios instance with custom configuration
const axiosInstance = axios.create();

// // Add a request interceptor to set a custom header
// axiosInstance.interceptors.request.use((config) => {
//   // Add your custom header here
//   config.headers['X-Request-Id']='';
//   return config;
// });

const TimeTester = () => {

    const create =  () => {
        axiosInstance.post("http://127.0.0.1:8000/api/time-mode/create/", { time: "600" },{withCredentials:true})
        .then((response) => {
          console.log(response.data);
          console.log("okay----");
          // Additional logic if needed
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    };

    const func =  () => {
        axiosInstance.get("http://127.0.0.1:8000/api/time-mode/",{withCredentials:true})
            .then((response) => {
                console.log("testr");
                // Additional logic if needed
            })
            .catch((error) => {
                console.error("Error fetching data:", error.response.data);
            });
    };

    return(
        <div>
            <button onClick={create} className={`border-4 border-green-400 hover:bg-orange-500`}>Create Time Mode</button>
            <button onClick={func} className={`border-4 border-green-400 hover:bg-orange-500`}>Request Problem</button>
        </div>
    );
};

export default TimeTester;

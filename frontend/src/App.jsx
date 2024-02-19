import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { useEffect } from 'react'
import './App.css'

import { BrowserRouter,Route,Routes } from 'react-router-dom'


import QuantityMode from './components/QuantityMode/QuantityMode'
import TimeMode from './components/TimeMode/TimeMode'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CustomMode from './components/CustomMode/CustomMode'
import Authentication from './components/User/Authentication'
import Problem from './components/ProblemSet/Problem'
import ProblemSet from './components/ProblemSet/ProblemSet'
import Cookies from 'js-cookie'
import AddProblem from './components/AddProblem/AddProblem.jsx'
import ContestList from './components/Contest/ContestList.jsx'
import Contest from './components/Contest/Contest.jsx'
import ContestProblem from './components/Contest/ContestProblem.jsx'

import { AuthContext } from './components/helpers/AuthContext'
import { ColorContext } from './components/helpers/ColorContext'
import { CSRFContext } from './components/helpers/CSRFContext'
import axios from 'axios'

import Home from './components/Home'

axios.defaults.withCredentials= true;

function App() {

  const [authState,setAuthState ] = useState({
    QuantityModeRunning:0,
    timerModeRunning:0,
    loggedIn:false,
    id: -1, 
    first_name: "response.data.first_name",
    last_name: "response.data.last_name",
    level: 5, 
    xp: 5,
    image: null,
    username: "response.data.username",
  })

  useEffect(() => {
   // console.log("&&&---app.jsx");

    axios.get('http://127.0.0.1:8000/')
    .then(response => {
      console.log(response.data)
    })
    .catch(error => {
    console.error( error);
    });

    // const authUnparsed = Cookies.get('authState')
    // console.log("t--------------------------")
    // console.log(authUnparsed)
    // if(authUnparsed){
    //   const authStateFromCookie = JSON.parse(authUnparsed);
    //   console.log(authStateFromCookie)
    //   setAuthState(authStateFromCookie);
    // }
    
    // const csrfToken =  Cookies.get('csrf')
    // console.log(csrfToken)
    // console.log("b--------------------------")
    // if (typeof csrfToken != 'undefined') {
    //   axios.defaults.headers.common['X-CSRFToken'] =csrfToken;
    //   console.log("cookie was already there");
    // } else {
      axios.get('http://127.0.0.1:8000/api/get-csrftoken/')
      .then(response => {
      console.log("cookie received:"+response.data.csrftoken)
      const csrfToken = response.data.csrftoken;
      //console.log(csrfToken);
      axios.defaults.headers.common['X-CSRFToken'] = csrfToken;
      //Cookies.set('csrf', csrfToken, { expires: 7 });
      })
      .catch(error => {
      console.error('Error fetching CSRF token:', error);
      });
      console.log("first time entry in the website");
  //  }
    
  }, []);

  //  useEffect(() => {console.log("change");
  //  if(authState.id!=-1)
  //     Cookies.set('authState', JSON.stringify(authState));
  // }, [authState]);

  const [colorState, setColorState] = useState({
    cp:2,
    bgcolor:'bg-cp2-bg',
    captioncolor:'text-cp2-cap',
    textcolor:'text-cp2-txt',
    textcolor2:'text-cp2-box2',
    textcolor3:'text-cp2-bg',
    box1color:'bg-cp2-box1',
    box2color:'bg-cp2-box2',
    box3color:'bg-cp2-txt'
  });

  const [ csrfState, setCSRFState]=useState();

  return (
    <div className="font-roboto" >
      < ColorContext.Provider value={[colorState, setColorState]} >
        <AuthContext.Provider value={[authState, setAuthState]}>
          <CSRFContext.Provider value={[csrfState, setCSRFState]}>
            <BrowserRouter>

              <div className={`${colorState.bgcolor} h-screen flex flex-col`}>
                <Navbar routeContext={routeContext} setRouteContext={setRouteContext} />
                <CustomComponent routeContext={routeContext} />
                <Footer />
              </div>
            </BrowserRouter>
          </CSRFContext.Provider>
        </AuthContext.Provider>
      </ColorContext.Provider >

    </div >
  )
}



export default App
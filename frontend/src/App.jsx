import { Component, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { useEffect } from 'react'
import './App.css'

import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'

import User from './components/User/User'
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
import Discussion from './components/Discussion/Discusssion.jsx'
import OneVOneProblem from './components/OneVOne/OneVOneProblem.jsx'
import Suggestion from './components/ProblemSet/Suggestion.jsx'

import { AuthContext } from './components/helpers/AuthContext'
import { ColorContext } from './components/helpers/ColorContext'
import { CSRFContext } from './components/helpers/CSRFContext'
import { EnvVariableContext } from './components/helpers/EnvVariableContext.jsx'

import axios from 'axios'

import Home from './components/Home'
import OneVOne from './components/OneVOne/OneVOne.jsx'
import DiscussionList from './components/Discussion/DiscussionList.jsx'

axios.defaults.withCredentials = true;
function App() {

  const [authState, setAuthState] = useState({
    QuantityModeRunning: 0,
    timerModeRunning: 0,
    loggedIn: false,
    id: -1,
    first_name: "response.data.first_name",
    last_name: "response.data.last_name",
    level: 5,
    xp: 5,
    image: null,
    username: "response.data.username",
  })

  const [envVariables,setEnvVariables]= useState({
    backendDomain:"http://127.0.0.1:8000/"
  })

  // const [envVariables,setEnvVariables]= useState({
  //   backendDomain:"http://172.212.122.116/"
  // })

  http://172.212.122.116/

  useEffect(() => {
   
    axios.get(envVariables.backendDomain)
    .then(response => {
      console.log(response.data)
    })
    .catch(error => {
    console.error( error);
    });

    const authUnparsed = Cookies.get('authState')
    if(authUnparsed){
      const authStateFromCookie = JSON.parse(authUnparsed);
      console.log(authStateFromCookie)
      setAuthState(authStateFromCookie);
    }
    
    axios.get(`${envVariables.backendDomain}api/get-csrftoken/`)
    .then(response => {
      const csrfToken = response.data.csrftoken;
      axios.defaults.headers.common['X-CSRFToken'] = csrfToken;
    })
    .catch(error => {
    console.error('Error fetching CSRF token:', error);
    });
    console.log("first time entry in the website");
    
  }, []);

   useEffect(() => {console.log("change");
   if(authState.id!=-1)
      Cookies.set('authState', JSON.stringify(authState));
  }, [authState]);

  const [colorState, setColorState] = useState({
    cp: 4,
    bgcolor: 'bg-cp4-bg',
    captioncolor: 'text-cp4-cap',
    textcolor: 'text-cp4-txt',
    textcolor2: 'text-cp4-box2',
    textcolor3: 'text-cp4-bg',
    box1color: 'bg-cp4-box1',
    box2color: 'bg-cp4-box2',
    box3color: 'bg-cp4-txt'
  });

  const [csrfState, setCSRFState] = useState();
  const [mode, setMode] = useState({ mode: "custom", setting: 1 });
  //*Time Selection PopUp----------------------------------------------------
  const [sendTime,setSendTime] = useState("600") //default time
  const [isTimeSelecetionPopupOpen, setTimeSelecetionPopupOpen] = useState(true);

  //*Settings Selection PopUp--------------------------------------------------------------------------
  const [isSettingsSelectionPopUpOpen, setSettingsSelectionPopUpOpen] = useState(false);

    //*Quantity Selection Popup-----------------------------------------------------------------
    const [quantity,setQuantity] = useState(2);
    const [isQuantitySelecetionPopupOpen,setQuantitySelecetionPopupOpen] = useState(true);
  
  return (
    <div className="font-roboto" >
      < ColorContext.Provider value={[colorState, setColorState]} >
        <AuthContext.Provider value={[authState, setAuthState]}>
          <CSRFContext.Provider value={[csrfState, setCSRFState]}>
            <EnvVariableContext.Provider value={[envVariables,setEnvVariables]}>
            <BrowserRouter>

              <div className={`${colorState.bgcolor} min-h-screen flex flex-col`}>
                <Navbar mode={mode} setMode={setMode}
                isTimeSelecetionPopupOpen={isTimeSelecetionPopupOpen} setTimeSelecetionPopupOpen={setTimeSelecetionPopupOpen} sendTime={sendTime} setSendTime={setSendTime}
                isSettingsSelectionPopUpOpen={isSettingsSelectionPopUpOpen} setSettingsSelectionPopUpOpen={setSettingsSelectionPopUpOpen}
                isQuantitySelecetionPopupOpen={isQuantitySelecetionPopupOpen} setQuantitySelecetionPopupOpen={setQuantitySelecetionPopupOpen} quantity={quantity} setQuantity={setQuantity}
                />
                <Routes>
                  <Route exact path='/' element={<Home />} />
                  <Route exact path='/CustomMode' element={<CustomMode mode={mode} setMode={setMode} isSettingsSelectionPopUpOpen={isSettingsSelectionPopUpOpen} setSettingsSelectionPopUpOpen={setSettingsSelectionPopUpOpen}  />} />
                  <Route exact path='/TimeMode' element={<TimeMode mode={mode} setMode={setMode} isTimeSelecetionPopupOpen={isTimeSelecetionPopupOpen} setTimeSelecetionPopupOpen={setTimeSelecetionPopupOpen} sendTime={sendTime} setSendTime={setSendTime} />} />
                  <Route exact path='/QuantityMode' element={<QuantityMode mode={mode} setMode={setMode} isQuantitySelecetionPopupOpen={isQuantitySelecetionPopupOpen} setQuantitySelecetionPopupOpen={setQuantitySelecetionPopupOpen} quantity={quantity} setQuantity={setQuantity}  />} />
                  <Route exact path='/Authentication' element={<Authentication/>}/>
                  <Route exact path='/User' element={<User/>}/>
                  <Route exact path='/Problem/:id' element={<Problem />} />
                  <Route exact path='/AddProblem' element={<AddProblem/>} />
                  <Route exact path='/ContestList' element={<ContestList/>} />
                  <Route exact path='/Contest/:id' element={<Contest/>} />
                  <Route exact path='/ContestProblem/:contestId/:problemId' element={<ContestProblem/>} />
                  <Route exact path='/ProblemSet' element={<ProblemSet/>} />
                  <Route exact path='/OneVOne' element={<OneVOne/>} />
                  <Route exact path='/DiscussionList' element={<DiscussionList/>} />
                  <Route exact path='/Discussion/:id' element={<Discussion/>} />
                  <Route exact path='/OneVOneProblem/:id' element={<OneVOneProblem/>} />
                  <Route exact path='/Suggestion/:id' element={<Suggestion/>} />
                </Routes>
                <Footer />
              </div>
            </BrowserRouter>
            </EnvVariableContext.Provider>
          </CSRFContext.Provider>
        </AuthContext.Provider>
      </ColorContext.Provider >

    </div >
  )
}

export default App



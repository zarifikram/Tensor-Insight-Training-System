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
   
    const authUnparsed = Cookies.get('authState')
    console.log("t--------------------------")
    console.log(authUnparsed)
    if(authUnparsed){
      const authStateFromCookie = JSON.parse(authUnparsed);
      console.log(authStateFromCookie)
      setAuthState(authStateFromCookie);
    }
    
    const csrfToken =  Cookies.get('csrf')
    console.log(csrfToken)
    console.log("b--------------------------")
    if (csrfToken) {
      axios.defaults.headers.common['X-CSRFToken'] =csrfToken;
    } else {
      console.log("first time entry in the website");
    }
    
  }, []);

   useEffect(() => {console.log("change");
   if(authState.id!=-1)
      Cookies.set('authState', JSON.stringify(authState));
  }, [authState]);

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
    <div>{
      
      <ColorContext.Provider value={[ colorState, setColorState]}>
      <AuthContext.Provider value={[ authState, setAuthState]}>
      <CSRFContext.Provider value={[ csrfState, setCSRFState]}>
      
      <div className={`${colorState.bgcolor} min-h-screen flex flex-col`}>
      {
      // <div className='flex justify-center'> 
      //   <button className='bg-cp1-bg w-10% text-cp1-txt' onClick={handleThemeSwitch1}>solarized light</button>
      //   <button className='bg-cp2-bg w-10% text-cp2-txt' onClick={handleThemeSwitch2}>nautilas</button>
      //   <button className='bg-cp3-bg w-10% text-cp3-txt' onClick={handleThemeSwitch3}>matrix</button>
      //   <button className='bg-cp4-bg w-10% text-cp4-txt' onClick={handleThemeSwitch4}>gruvbox dark</button>
      //   <button className='bg-cp5-bg w-10% text-cp5-txt' onClick={handleThemeSwitch5}>hedge</button>
      //   <button className='bg-cp6-bg w-10% text-cp6-txt' onClick={handleThemeSwitch6}>tron orange</button>
      //   <button className='bg-cp7-bg w-10% text-cp7-txt' onClick={handleThemeSwitch7}>godspeed</button>
      //   <button className='bg-cp8-bg w-10% text-cp8-txt' onClick={handleThemeSwitch8}>miami</button>
      //   <button className='bg-cp9-bg w-10% text-cp9-txt' onClick={handleThemeSwitch9}>bushido</button>
      //   <button className='bg-cp10-bg w-10% text-cp10-txt' onClick={handleThemeSwitch10}>mexican</button>
      // </div>
      }
      <BrowserRouter>
        <Navbar/>
        <Routes>
        <Route exact path='/' element={<Home />} />
          <Route exact path='/CustomMode' element={<CustomMode/>}/>
          <Route exact path='/TimeMode' element={<TimeMode/>}/>
          <Route exact path='/QuantityMode' element={<QuantityMode/>}/>
          <Route exact path='/Authentication' element={<Authentication/>}/>
          <Route exact path='/Problem/:id' element={<Problem />} />
          <Route exact path='/AddProblem' element={<AddProblem/>} />
          <Route exact path='/ContestList' element={<ContestList/>} />
          <Route exact path='/Contest/:id' element={<Contest/>} />
          <Route exact path='/ContestProblem/:contestId/:problemId' element={<ContestProblem/>} />
        </Routes>
        <Footer/>
      </BrowserRouter>
      </div>
      </CSRFContext.Provider>
      </AuthContext.Provider>
      </ColorContext.Provider>
    }
    </div>
  )
}



export default App
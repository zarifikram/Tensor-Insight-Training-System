import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { BrowserRouter,Route,Routes } from 'react-router-dom'

import Navbar from './components/Navbar'
import Home from './components/Home'
import Navbar2 from './components/Navbar2'

import { AuthContext } from './components/helpers/AuthContext'

function App() {

  const [authState, setAuthState] = useState({
    bgcolor:'bg-cp2-bg',
    captioncolor:'text-cp2-cap',
    textcolor:'text-cp2-txt',
    textcolor2:'text-cp2-box2',
    box1color:'bg-cp2-box1',
    box2color:'bg-cp2-box2'
  });

  const handleThemeSwitch1 = () => {
    // Update the state to change the className
    setAuthState({
      bgcolor:'bg-cp1-bg',
      captioncolor:'text-cp1-cap',
      textcolor:'text-cp1-txt',
      textcolor2:'text-cp1-box2',
      box1color:'bg-cp1-box1',
      box2color:'bg-cp1-box2'
    })
    console.log(authState)
  };


  const handleThemeSwitch2 = () => {
    // Update the state to change the className
    setAuthState({
      bgcolor:'bg-cp2-bg',
      captioncolor:'text-cp2-cap',
      textcolor:'text-cp2-txt',
      textcolor2:'text-cp2-box2',
      box1color:'bg-cp2-box1',
      box2color:'bg-cp2-box2'
    })
    console.log(authState)

  };

  const handleThemeSwitch3 = () => {
    // Update the state to change the className
    setAuthState({
      bgcolor:'bg-cp3-bg',
      captioncolor:'text-cp3-cap',
      textcolor:'text-cp3-txt',
      textcolor2:'text-cp3-box2',
      box1color:'bg-cp3-box1',
      box2color:'bg-cp3-box2'
    })
    console.log(authState)
  }; 

  const handleThemeSwitch4 = () => {
    // Update the state to change the className
    setAuthState({
      bgcolor:'bg-cp4-bg',
      captioncolor:'text-cp4-cap',
      textcolor:'text-cp4-txt',
      textcolor2:'text-cp4-box2',
      box1color:'bg-cp4-box1',
      box2color:'bg-cp4-box2'
    })
    console.log(authState)
  }; 

  const handleThemeSwitch5 = () => {
    // Update the state to change the className
    setAuthState({
      bgcolor:'bg-cp5-bg',
      captioncolor:'text-cp5-cap',
      textcolor:'text-cp5-txt',
      textcolor2:'text-cp5-box2',
      box1color:'bg-cp5-box1',
      box2color:'bg-cp5-box2'
    })
    console.log(authState)
  }; 

  return (
    <div>
      <AuthContext.Provider value={[ authState, setAuthState]}>
      <div className={`${authState.bgcolor} min-h-screen flex flex-col`}>
      <div className='flex justify-center'> 
        <button className='bg-cp1-bg w-10% text-cp1-txt' onClick={handleThemeSwitch1}>solarized light</button>
        <button className='bg-cp2-bg w-10% text-cp2-txt' onClick={handleThemeSwitch2}>nautilas</button>
        <button className='bg-cp3-bg w-10% text-cp3-txt' onClick={handleThemeSwitch3}>matrix</button>
        <button className='bg-cp4-bg w-10% text-cp4-txt' onClick={handleThemeSwitch4}>gruvbox dark</button>
        <button className='bg-cp5-bg w-10% text-cp5-txt' onClick={handleThemeSwitch5}>hedge</button>
      </div>
      <BrowserRouter>
        <Navbar2/>
        <Routes>
          <Route exact path='/' element={<Home/>}/>
        </Routes>
      </BrowserRouter>
      </div>
      </AuthContext.Provider>
    </div>
  )
}

export default App
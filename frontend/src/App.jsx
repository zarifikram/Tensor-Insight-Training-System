import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { BrowserRouter,Route,Routes } from 'react-router-dom'

import Navbar from './components/Navbar'
import Home from './components/Home'
import Navbar2 from './components/Navbar2'
import Footer from './components/Footer'

import { AuthContext } from './components/helpers/AuthContext'

import ParentComponent from './components/popUpParent'

function App() {

  const [authState, setAuthState] = useState({
    cp:2,
    bgcolor:'bg-cp2-bg',
    captioncolor:'text-cp2-cap',
    textcolor:'text-cp2-txt',
    textcolor2:'text-cp2-box2',
    box1color:'bg-cp2-box1',
    box2color:'bg-cp2-box2'
  });

  return (
    <div>
      <AuthContext.Provider value={[ authState, setAuthState]}>
      
      <div className={`${authState.bgcolor} min-h-screen flex flex-col`}>
      {/*
      <div className='flex justify-center'> 
        <button className='bg-cp1-bg w-10% text-cp1-txt' onClick={handleThemeSwitch1}>solarized light</button>
        <button className='bg-cp2-bg w-10% text-cp2-txt' onClick={handleThemeSwitch2}>nautilas</button>
        <button className='bg-cp3-bg w-10% text-cp3-txt' onClick={handleThemeSwitch3}>matrix</button>
        <button className='bg-cp4-bg w-10% text-cp4-txt' onClick={handleThemeSwitch4}>gruvbox dark</button>
        <button className='bg-cp5-bg w-10% text-cp5-txt' onClick={handleThemeSwitch5}>hedge</button>
        <button className='bg-cp6-bg w-10% text-cp6-txt' onClick={handleThemeSwitch6}>tron orange</button>
        <button className='bg-cp7-bg w-10% text-cp7-txt' onClick={handleThemeSwitch7}>godspeed</button>
        <button className='bg-cp8-bg w-10% text-cp8-txt' onClick={handleThemeSwitch8}>miami</button>
        <button className='bg-cp9-bg w-10% text-cp9-txt' onClick={handleThemeSwitch9}>bushido</button>
        <button className='bg-cp10-bg w-10% text-cp10-txt' onClick={handleThemeSwitch10}>mexican</button>
      </div>*/
      }
      <BrowserRouter>
        <Navbar2/>
        <Routes>
          <Route exact path='/' element={<Home/>}/>
        </Routes>
        <Footer/>
      </BrowserRouter>
      </div>
      </AuthContext.Provider>
    </div>
  )
}

export default App
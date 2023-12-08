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
    bgcolor:'bg-darkblue',
  });


  const handleThemeSwitch1 = () => {
    // Update the state to change the className
   
    setAuthState({
      bgcolor:'bg-darkblue'
    })
    console.log(authState.bgcolor)
  };

  const handleThemeSwitch2 = () => {
    // Update the state to change the className
    
    setAuthState({
      bgcolor:'bg-green-100'
    })
    console.log(authState.bgcolor)
  };  

  return (
    <div>
      <AuthContext.Provider value={[ authState, setAuthState]}>
      <div className={`${authState.bgcolor} min-h-screen flex flex-col`}>
      <button onClick={handleThemeSwitch1}>button1</button>
      <button onClick={handleThemeSwitch2}>button2</button>
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
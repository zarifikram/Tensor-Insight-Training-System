import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { BrowserRouter,Route,Routes } from 'react-router-dom'

import Navbar from './components/Navbar'
import Home from './components/Home'
import Navbar2 from './components/Navbar2'

function App() {
  const [className1, setClassName1] = useState('bg-green-100');

  const handleThemeSwitch1 = () => {
    // Update the state to change the className
    setClassName1('bg-darkblue');
  };

  const handleThemeSwitch2 = () => {
    // Update the state to change the className
    setClassName1('bg-green-100');
  };  

  return (
    <div className={`${className1} min-h-screen flex flex-col`}>
      <button onClick={handleThemeSwitch1}>button1</button>
      <button onClick={handleThemeSwitch2}>button2</button>
      <BrowserRouter>
        <Navbar2/>
        <Routes>
          <Route exact path='/' element={<Home/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App

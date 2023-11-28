import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'



function App() {
  const [count, setCount] = useState(0)

  var t1 = "[[1, 2, 3]], [4, 1, 2], [2, 1, 5]]"
  var t2 = "[[1]], [2], [5]]"
  var t3 = "[[1, 2, 3]], [4, 1, 2], [2, 1, 5]]"

  return (
    <>
    <div class="parent">
        <div class="navbar">
            <div class="name">
                <h1>TensorITS</h1>
            </div>
            <div class="optionbar">
                <div class="time">time</div>
                <div class="quantity">quantity</div>
                <div class="divider">1</div>
                <div class="number">1 2 3 4 5</div>
            </div>
            <div class="userid">userid</div>
        </div>
        <div class="inputbar1">
            <div class="leftbar">
              {t1}
            </div>
            <div class="rightbar">
                {t2}
            </div>
        </div>
        <div class="inputbar2">
            <div class="middlebar">
                {t3}
            </div>
        </div>
        <div class="coding">
            <h2>start typing your code...</h2>
        </div>
    </div>
    </>
  )
}

export default App

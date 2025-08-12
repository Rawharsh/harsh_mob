import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './login'
import Signup from './Signup'
import OtpVerification from './OtpVerification'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {
 

  return (

    <Routes>
      <Route path='/login' element={<Login/>} />
      <Route path='/Signup' element={<Signup/>} />  
      <Route path='/OtpVerification' element={<OtpVerification/>} />  
      
    </Routes>
   
  )
}

export default App

import React from 'react'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './Components/Nav_bl'
import HeroSection from './Components/HeroSection'
import Card from './Components/Card'
import Nav_bl from './Components/Nav_bl'
import Landing from './Pages/Landing'

function App() {
  return (
    <>
      <div>
        <Landing/>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
          </Routes>
        </BrowserRouter>
 </div>

      </>       
  )
}
   

export default App;

import React from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navbar'
import HeroSection from './Components/HeroSection'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
<<<<<<< HEAD

function App() {
  return (
    <div>
        {/* <Navbar/> */}
        <Routes>
          <Route path="/" element={<HeroSection />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
    </div>
=======
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navbar'

import HeroSection from './Components/HeroSection'
import "./App.css"

function App() {
  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
          </Routes>
        </BrowserRouter>
 </div>

      </>       
>>>>>>> 963d962e5b5994b6ed27654dfd74881b6abbe29c
  )
}

export default App

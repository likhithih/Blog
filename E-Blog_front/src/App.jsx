import React from 'react'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navbar'

import HeroSection from './Components/HeroSection'
import "./App.css"


import './App.css'
 b0acc7bc1cfd17f2555035dfaf7d71010e29f3de

function App() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <div>
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

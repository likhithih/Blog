import React from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navbar'
import HeroSection from './Components/HeroSection'
import Login from './Pages/Login'
import Signup from './Pages/Signup'

function App() {
  return (
    <div>
        <Navbar/>
        <Routes>
          <Route path="/" element={<HeroSection />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
    </div>
  )
}

export default App

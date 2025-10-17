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
import { GoogleOAuthProvider } from '@react-oauth/google';
import BlogPost from './Pages/BlogPost'

function App() {
  return (
    <>
      <div>
        
        <BrowserRouter>
          <Routes>
            <Route path='/'element={<Landing/>}/>
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
          </Routes>
        </BrowserRouter>
 </div>

      </>       
  )
}
   

export default App;

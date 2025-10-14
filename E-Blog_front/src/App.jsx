import React from 'react'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
<<<<<<< HEAD
=======
import Navbar from './Components/Navbar'
<<<<<<< HEAD
import HeroSection from './Components/HeroSection'
import "./App.css"
=======
>>>>>>> 339965d96da937d2587d5c9c92ed5377cdc93ca0
import './App.css'

>>>>>>> b0acc7bc1cfd17f2555035dfaf7d71010e29f3de

function App() {
  return (
<<<<<<< HEAD
    <>
      <Navbar/>
      <HeroSection/>
    </>
=======
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
      </Routes>
      </BrowserRouter>
       
    </div>

>>>>>>> b0acc7bc1cfd17f2555035dfaf7d71010e29f3de
  )
}
   

export default App
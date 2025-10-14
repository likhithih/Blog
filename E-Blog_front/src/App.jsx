<<<<<<< HEAD
import React from 'react'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import { BrowserRouter, Routes, Route } from 'react-router-dom'


function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
      </Routes>
      </BrowserRouter>
    </div>
=======
import Navbar from './Components/Navbar'
import "./App.css"

function App() {


  return (
    <>
      <Navbar/>
       
    </>
>>>>>>> 7c0ba17a6114549cfcaa1ebc93942a7af48d5fd7
  )
}

export default App
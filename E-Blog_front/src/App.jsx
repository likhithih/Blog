import React from 'react'
// import Login from './Pages/Login'
// import Signup from './Pages/Signup'
// //import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navbar'
import HeroSection from './Components/HeroSection'
import "./App.css"
import ReviewSection from './Components/ReviewSection'
import Footer from './Components/Footer'

 

function App() {
  return (
    <>
      {/* <Navbar />
      <HeroSection /> */}
      <ReviewSection/>
      <Footer/>
      {/* <div>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
          </Routes>
        </BrowserRouter>
      </div> */}

      </>       
  )
}
   

export default App;

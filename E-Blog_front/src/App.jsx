import React from "react";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import HeroSection from "./Components/HeroSection";
import BlogSection from "./Components/BlogSction";

function App() {
  return (
    <>
      
      

      <div>
        <BrowserRouter>
          <Routes>
            
            <Route path="/" element={<HeroSection />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </BrowserRouter>
      </div>
      <BlogSection />
    </>
  );
}

export default App;

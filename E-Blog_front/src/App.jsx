import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import HeroSection from "./Components/HeroSection";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Card from "./Components/Card";

function App() {
  return (
    <>
      <div>
        <Navbar />
        <HeroSection />
        <Card />
      </div>
      <div>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </>
  );
}

export default App;

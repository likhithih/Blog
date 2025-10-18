import './App.css'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Nav_bl from './Components/Nav_bl'
import Home from './Pages/Home'
import 'react-toastify/dist/ReactToastify.css';
import CreateBlog from './Pages/CreateBlog'
import BlogSection from './Components/BlogSection'
import About from './Pages/About'
import PageNotFound from './Pages/PageNotFound'
import BlogPost from './Pages/BlogPost'
// import HeroSection from './Components/HeroSection'
import LandingBody from './Components/LandingBody'



function App() {
  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<><Nav_bl /><LandingBody /></>} />
            <Route path='/home' element={<Home />} />
            <Route path='/create' element={<CreateBlog />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/blog' element={<BlogSection />} />
            <Route path='/about' element={<About />} />
            <Route path='/blog/:id' element={<BlogPost />} />
            <Route path='*' element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
        {/* <LandingBody/> */}
      
      </div>
    </>
  )
}

export default App;

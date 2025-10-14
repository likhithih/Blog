import React from 'react'
import { Link } from 'react-router-dom'
import './Login.css'

function Login() {
  return (
    <div className='Container'>
      <div className='login-form'>
        <form action="">
          <h1>Login</h1>
          <div>
            <input type="text" placeholder='Enter your username' />
            <br />
            <input type="password" placeholder='Enter your password' />
            <br />
            <button type='submit'>Login</button>
          </div>
        </form>
        <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
      </div>
    </div>
  )
}

export default Login

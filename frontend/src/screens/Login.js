/**
 *  user can login to the main page 
 */

import React from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

function Login() {
  const navigate = useNavigate();
  const [Password, setPassword] = React.useState();
  const [email, setemail] = React.useState();


  const handleLogin = (e)=>{
    e.preventDefault();
    console.log(email,Password);
    axios.post("http://localhost:5000/api/users/login",{
      email: email,
      password: Password
    }).then(res=>{
      console.log(res)
      alert("You are logged in")
      localStorage.setItem("token", res.data.token)
      navigate("/treatments")
    })

  }
  
    return (
    <div>
        <>
 <section className='heading'>
        <h1>
           Login
        </h1>
        <p>Login to make a booking</p>
      </section>

      <section className='form'>
        <form>
          <div className='form-group'>
            <input
              type='email'
              className='form-control'
              id='email'
              name='email'
              value={email}
              placeholder='Enter your email'
              onChange={e=>setemail(e.target.value)}
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              className='form-control'
              id='password'
              name='password'
              value={Password}
              placeholder='Enter password'
              onChange={e=>setPassword(e.target.value)}
            />
          </div>

          <div className='form-group'>
            <button
            onClick={handleLogin}
            type='submit' className='btn btn-block'>
              Submit
            </button>
          </div>
        </form>
      </section>
    </>

    </div>
  )
}

export default Login
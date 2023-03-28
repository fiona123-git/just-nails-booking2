/**
 * new user would be sign up to view main page then redirected to login
 * redirection to be signed up using social media platforms
 */
import React from 'react'
import { FaUser } from 'react-icons/fa'
function Register() {
  return (
    <div>
        <h1>Register here</h1>
        <section className='heading'>
        <h1>
          
          <FaUser /> Register
        </h1>
        <p>Please create an account</p>
      </section>
    
      <section className='form'>
        <form onSubmit>
          <div className='form-group'>
            <input
              type='text'
              className='form-control'
              id='name'
              name='name'
              value='name'
              placeholder='Enter your name'
              onchange='onchange'
            />
          </div>
          <div className='form-group'>
            <input
              type='email'
              className='form-control'
              id='email'
              name='email'
              value='email'
              placeholder='Enter your email'
              onChange='onchange'
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              className='form-control'
              id='password'
              name='password'
              value='password'
              placeholder='Enter password'
              onchange='onchange'
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              className='form-control'
              id='password2'
              name='password2'
              value='password'
              placeholder='Confirm password'
              onChange='onchange'
            />
          </div>
          <div className='form-group'>
            <button type='submit' className='btn btn-block'>
              Submit
            </button>
          </div>
        </form>
      </section>
    
    </div>
  )
}

export default Register
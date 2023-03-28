/**
 *  user can login to the main page 
 */

import React from 'react'

function Login() {
  
  
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
              //value={email}
              placeholder='Enter your email'
              //onChange={}
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              className='form-control'
              id='password'
              name='password'
              //value={password}
              placeholder='Enter password'
              //onChange={}
            />
          </div>

          <div className='form-group'>
            <button type='submit' className='btn btn-block'>
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
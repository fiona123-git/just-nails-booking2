/**
 * new user would be sign up to view main page then redirected to login
 * redirection to be signed up using social media platforms
 */
import React from 'react'
import { FaUser } from 'react-icons/fa'
import axios from "axios"
import { useNavigate } from 'react-router-dom'

function Register() {
  // const navigate = React.useNavigate();
  const navigate = useNavigate();

  const [name, setName] = React.useState();
  const [Password, setPassword] = React.useState();
  const [Password2, setPassword2] = React.useState();
  const [email, setemail] = React.useState();

  const handleSubmit = (e)=>{
    e.preventDefault();
      console.log('Submit')
    if(Password===Password2){
      console.log(name,email,Password,Password2);
      axios.post("http://localhost:5000/api/users/",{
        name: name,
        email: email,
        password: Password
      }).then(res=>{
        console.log(res)
        alert("You have created an account")
        // navigate('/login', { replace: true });
        navigate("/login")


      })
    }else{
    
      alert("Passwords Dont Match")

    }

    

  }

  return (
    <div>
      
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
              value={name}
              placeholder='Enter your name'
              onChange={e=>{setName(e.target.value)}}
            />
          </div>
          <div className='form-group'>
            <input
              type='email'
              className='form-control'
              id='email'
              name='email'
              value={email}
              placeholder='Enter your email'
              onChange={e=>{setemail(e.target.value)}}
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
              onChange={e=>{setPassword(e.target.value)}}
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              className='form-control'
              id='password2'
              name='password2'
              value={Password2}
              placeholder='Confirm password'
              onChange={e=>{setPassword2(e.target.value)}}
            />
          </div>
          <div className='form-group'>
            <button 
            
            onClick={handleSubmit} 
            type='submit' className="btn btn-lg btn-secondary btn-block">
              Submit
            </button>
          </div>
        </form>
      </section>
    
    </div>
  )
}

export default Register
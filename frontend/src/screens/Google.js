
import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

const Google = () => {
const navigate = useNavigate();
   
const handleGoogleLoginSuccess=(tokenResponse) => {
  
       
        const accessToken = tokenResponse.access_token;

        axios.post("http://localhost:5000/api/social/googele-login",{
      accessToken
    
    }).then(res=>{
      console.log(res)
      alert("You are logged in")
      localStorage.setItem("token", res.data.token)
      if(res.data.isAdmin){
        navigate("/admin/")
      }else{
        navigate("/treatments")
         window.location.reload();
      }
      
    
  
    })
     
    const login = useGoogleLogin({onSuccess: handleGoogleLoginSuccess});

  


  }


return (
          <div>
                        
         <button  className="btn btn-danger btn-lg btn-block" onClick={() => login()} >
                    <i class="fab fa-google pr-2"></i>  Sign in with google</button>
                

        </div>
    );
};

export default Google;


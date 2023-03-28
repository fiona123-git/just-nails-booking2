import React from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'


function Treatments() {
  const [user, setUser] = React.useState({});
  const [treatment, setTreatment] = React.useState({});

  const navigate = useNavigate();

  React.useEffect(()=>{

    const token = localStorage.getItem("token") 

    if(!token){
      navigate("/login")
      return;
    }
    axios.get("http://localhost:5000/api/users/me",{
      headers:{
        "Authorization": `Bearer ${token}`
      }
    }).then(res=>{
      console.log(res.data);

      setUser(res.data)
    }).catch(e=>{
     navigate("/login")

    })


  },[])

  return (
    <div>
      <h1>Treatments</h1>
      <h1>Welcome {user.name}</h1>
    </div>
  )
}

export default Treatments
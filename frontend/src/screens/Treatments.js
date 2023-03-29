import React, { useState, useEffect } from "react"; // import usestate and useEffect from react
import axios from "axios" // import axios from "axios"
import { useNavigate } from 'react-router-dom' // import use navigate from react-router-dom


function Treatments() {
  const [user, setUser] = useState({}); // create user state
  const [treatment, setTreatment] = useState({}); // create treatment state

  const navigate = useNavigate(); // use navigate to navigate 

  const getTreatmentlists = () =>{ 
    axios.get("http://localhost:5000/api/treatments").then((response) => {
      setTreatment(response.data);
    });
  }
  
  useEffect(() => {
    getTreatmentlists()
  }, []);

  useEffect(()=>{

    const token = localStorage.getItem("token") // this gets the user token

    if(!token){ // if it isnt the right token then go to login
      navigate("/login")
      return;
    }
    axios.get("http://localhost:5000/api/users/me",{ // get api for users
      headers:{
        "Authorization": `Bearer ${token}` // authorization is bearer token
      }
    }).then(res=>{ // then respond with the data
      console.log(res.data);

      setUser(res.data) // set user with data
    }).catch(e=>{ // catch the error will result to navigate to login
     navigate("/login") 

    })


  },[]
  
  
   
  
  )

  return (
    <div>
      
      <h1>Welcome {user.name}</h1>

      <h2 className="title">Full Treatment list</h2>
      <h1>List of treatments</h1>
   <table className="center">
        <tbody>
          <tr>
            <th></th>
            <th>Therapy</th>
            <th>Description</th>
            <th>Price</th>
            
            <th></th>
          </tr>

{treatment.map((record) => (
            <tr key={record._id}>
              <td>{record.id}</td>

              <td>
                <input
                  type="text"
                  defaultValue={record.therapy}
                 
                />
              </td>
              <td>
                <input
                  type="text"
                  defaultValue={record.description}
                  
                />
              </td>
              <td>
                <input
                  type="text"
                  defaultValue={record.price}
                 
                />
              </td>
             </tr>
))}
              </tbody>
              
              </table>


      
    </div>
  )
}

export default Treatments
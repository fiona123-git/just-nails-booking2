import React, { useState, useEffect } from "react"; // import usestate and useEffect from react
import axios from "axios" // import axios from "axios"
import { useNavigate } from 'react-router-dom' // import use navigate from react-router-dom


function Treatments() {
  const [user, setUser] = useState({}); // create user state
  const [treatment, setTreatment] = useState([]); // create treatment state

  const navigate = useNavigate(); // use navigate to navigate 

  const getTreatmentlists = () =>{ 
    axios.get("http://localhost:5000/api/treatments").then((response) => {
      setTreatment(response.data);
      console.log(response.data);
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


  },[])

  const handleBooking = (e,record) =>{
    e.preventDefault();

    alert(record.price)
    const token = localStorage.getItem("token") // this gets the user token

    axios.post(`http://localhost:5000/api/bookings`,{
      booking: 
      {"therapy" : record.therapy,
      "date": "1231",
      "time": "12313",
      "price": record.price,
      "treatment": record._id,
    }},{
      headers:{
        "Authorization": `Bearer ${token}` // authorization is bearer token
      }
    }
    ).then(res=>{
      console.log(res)
      alert("You have made a Booking")

    })
    

  }

  return (
    <div>
      
      <h1 className="title">Welcome {user.name}</h1>

      
      <h1>List of treatments</h1>
   <table className="center  center  table table-hover table-striped bg-info">
        <tbody>
          <tr>
            <th></th>
            <th>Therapy</th>
            <th>Description</th>
            <th>Price</th>
            <th>Time and Date</th>

            <th>Action</th>
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
              <td>
                <input type="datetime-local" id="datetime" name="datetime"/>

              </td>
              <td>
                <input
                  type="button"
                  value="Book"
                  onClick={e=>handleBooking(e,record)}
                 
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
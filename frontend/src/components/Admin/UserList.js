/**
 * Admin can 
 * get  users 
 * delete user
 * update user
 * 
 * 
 * 
 */

import  { useEffect, useState } from "react"; // import useEffect and useState from react
import axios from "axios"; // import axios from axios
import { useNavigate } from 'react-router-dom'

function UserList() {
  const navigate = useNavigate();
 const[update,setUpdate]=useState({name: "",
          email: "",}
          )

const [users, setUsers] = useState([])

  const getUserData =()=>{
   axios.get("http://localhost:5000/api/users").then((response) => { // use axios to get users
      setUsers(response.data);
      console.log(response.data);
    });

    
  }

  useEffect(() => {
    getUserData();
  }, []);


  useEffect (()=>{

    const token = localStorage.getItem("token") // this gets the user token

    if(!token){ // if it isnt the right token then go to login
      navigate("/login")
      return;
    }
    axios.get("http://localhost:5000/api/users/",{ // get api for users
      headers:{
        "Authorization": `Bearer ${token}` // authorization is bearer token
      }
    }).then(res=>{ // then respond with the data
      console.log(res.data);

      setUsers(res.data) // set user with data
    }).catch(e=>{ // catch the error will result to navigate to login
     navigate("/login") 

    })



})

function updateList(e) {
    //stops button from clearing once submitted

    e.preventDefault();
    let id = e.target.id;
    console.log({
      update,
    });
    // use axios to update request to the database
    axios
      .put(`http://localhost:8000/api/users/${id}`, update)
      // it recieves the responce of the promise then it accepts
      .then((res) => {
        setUpdate({
          name: "",
          email: "",
          
        });
        console.log(res.data.message);
        alert("Updated");
       
        getUserData()
      })
      .catch((err) => {
        console.log("Failed to update user");
        console.log(err.message);
      });
  }



   const deleteList=(e)=> {
    e.preventDefault();
    let id = e.target.id;
    axios.delete(`http://localhost:5000/api/users/${id}`)
  .then((res) => {
      console.log(res);
    
      getUserData()
      
    })
    .catch((error) => console.log(error));
  };

 
  return (
    <div className="container">
   <h1 className="title">List of Users</h1>
   <table className="center center  table table-hover table-striped bg-info">
        <tbody>
          <tr>
            <th></th>
            <th>NAME</th>
            <th>EMAIL</th>
            
            
            <th></th>
          </tr>

          {users.map((record) => (
            <tr key={record._id}>
              <td>{record.id}</td>

              <td>
                <input
                  type="text"
                  Value={record.name}
                  onChange={(evt) =>
                    setUpdate({
                      name: evt.target.value,
                    })
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  Value={record.email}
                  onChange={(evt) =>
                    setUpdate({
                      email: evt.target.value,
                    })
                  }
                />
              </td>
             
              
              
              

              <td>
                <input
                  type="button"
                  value="Delete"
                  onClick={deleteList}
                  id={record._id}
                ></input>
              </td>
              <td>
                <input
                  type="button"
                  value="Update"
                  id={record._id}
                  onClick={updateList}
                ></input>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
     
      
    
    
    </div>
  );




    
}



export default UserList
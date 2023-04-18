/**
 * navbar 
 * two functions 
 * if user info = admin then it goes to admin links
 * else if user info equals user then it goes to user login or register
 */

import React,{useState,useEffect} from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import axios from 'axios';
import { useNavigate } from 'react-router-dom' // import use navigate from react-router-dom


function Header() {
  const [user,setUser]= useState({})
  const navigate = useNavigate(); // use navigate to navigate 

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
  return (
    <div>
   <Nav class="navbar navbar-expand-lg navbar-dark bg-primary navbar text-dark">
      <Container>
        <Navbar.Brand href="#home">just nails</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {user.isAdmin ? (
         <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            
            <NavDropdown title="Admin" id="adminmenu">
              <NavDropdown.Item href="/admin/bookingList">Booking List</NavDropdown.Item>
              <NavDropdown.Item href="/admin/userList">
                User list
              </NavDropdown.Item>
              <NavDropdown.Item href="/admin/treatmentList">Treatment list</NavDropdown.Item>
              <NavDropdown.Divider />
              
            </NavDropdown>
          </Nav>
          ):(
            <Nav className="me-auto">
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/register">Register</Nav.Link>
            
            <Nav.Link href="/treatments">Treatments</Nav.Link>
            <NavDropdown title={user.name} id="username">
              <NavDropdown.Item href="/treatments">Treatments</NavDropdown.Item>
              <NavDropdown.Item href="/bookings">
                Bookings
              </NavDropdown.Item>
              
            </NavDropdown>
          </Nav>
          
          )}
        
        </Navbar.Collapse>
      </Container>
 </Nav>

    
    </div>
  )
}

export default Header
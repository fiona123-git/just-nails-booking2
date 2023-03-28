/**
 *  welcome page will consist of two options
 redirection to the login page and signup page 
 if the user is logged in the user goes to the main page and views the list of treatments
 then can make a booking once that is made an alert would be given to confirm booking

 * 
 */

 
  import React from 'react'
  import './../App.css'
  function Welcome() {
    return (
      <div>

    <div>
       <h1 className="header">Welcome to just nails beauty</h1>
        <h2>where beautiful nails are made</h2>
    </div>
      </div>
    )
  }
  
  export default Welcome
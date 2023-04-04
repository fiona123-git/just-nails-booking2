/**
 * Admin can 
 * get  users 
 * delete user
 * update user
 * 
 * 
 * 
 */

import React from 'react'
function UserList() {
  
  return (
    <div className="container">
   <h1>List of Users</h1>
   <table className="center">
        <tbody>
          <tr>
            <th></th>
            <th>NAME</th>
            <th>EMAIL</th>
            
            
            <th></th>
          </tr>

          {UserList.map((record) => (
            <tr key={record._id}>
              <td>{record.id}</td>

              <td>
                <input
                  type="text"
                  defaultValue={record.name}
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
                  defaultValue={record.email}
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
     
      <h1> Add new user</h1>
       <div className="form-group">
      
       <form>
      <label>Name</label>
        
      <input
        
        type="text"
        onChange={(event) => {
          setName(event.target.value);
        }}
      />
      <br />
      
      <label>Email</label>
      
      <input
        
        type="text"
        onChange={(event) => {
          setEmail(event.target.value);
        }}
      />
      <br />
      
      
    
      
      <button onClick={addTolist}>Add new user</button>
      </form>
      
    </div>
    
    </div>
  );




    
}



export default UserList
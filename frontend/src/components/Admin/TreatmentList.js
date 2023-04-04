/**
 * create treatment
 * delete treatment
 * update treatment
 * get treatment
 * list users
 * delete users
 * list bookings
 * delete booking
 * create bookings
 * 
 */

import React from 'react'

function TreatmentList() {
  
  return (
    <div className="container">
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

          {treatmentlist.map((record) => (
            <tr key={record._id}>
              <td>{record.id}</td>

              <td>
                <input
                  type="text"
                  defaultValue={record.therapy}
                  onChange={(evt) =>
                    setUpdate({
                      therapy: evt.target.value,
                    })
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  defaultValue={record.description}
                  onChange={(evt) =>
                    setUpdate({
                      description: evt.target.value,
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
     
      <h1> Add new treatments</h1>
       <div className="form-group">
      
       <form>
      <label>therapy</label>
        
      <input
        
        type="text"
        onChange={(event) => {
          setTherapy(event.target.value);
        }}
      />
      <br />
      
      <label>Description</label>
      
      <input
        
        type="text"
        onChange={(event) => {
          setDescription(event.target.value);
        }}
      />
      <br />
      <label>Price</label>
      
      <input
      
        type="text"
        onChange={(event) => {
          setPrice(event.target.value);
        }}
      />{" "}
      <br />
      
    
      
      <button onClick={addTolist}>Add new treatment</button>
      </form>
      
    </div>
    
    </div>
  );




    
}

export default TreatmentList 
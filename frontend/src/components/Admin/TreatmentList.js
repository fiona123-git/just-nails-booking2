/**
 * create treatment
 * delete treatment
 * update treatment
 * get treatment
 


 
 */

import  axios  from 'axios'
import { useEffect, useState } from "react";

function TreatmentList() {
  const [treatment, setTreatment] = useState([]);
  const [therapy, setTherapy] = useState([]);
  const[description, setDescription] = useState([]);
  const[price,setPrice]=useState([]);
  const[update,setUpdate] = useState({therapy:"",description:"",price:"",});
 
 const getTreatmentData=()=>{
    axios.get("http://localhost:5000/api/treatments").then((response) => {
      setTreatment(response.data);
      console.log(response.data);
    });


  }

   useEffect (()=>{

getTreatmentData()

},[])



const addTolist=()=>{
axios.post("http://localhost:5000/api/treatments",
{
  therapy: therapy,
  description: description,
  price:price

},
{
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
)

  .then((res) => {
        console.log(res);
        console.log(res.statusText);
          if (res.statusText === "OK") {
          alert("data added successfully");
        getTreatmentData()
        }
      })
      .catch((error) => console.log(error));
}

function updateList(e) {
    //stops button from clearing once submitted

    e.preventDefault();
    let id = e.target.id;
    console.log({
      update,
    });
    // use axios to update request to the database
    axios
      .put(`http://localhost:5000/api/treatments/${id}`, update)
      // it recieves the responce of the promise then it accepts
      .then((res) => {
        setUpdate({
          therapy: "",
          description: "",
          price:""
        });
        console.log(res.data.message);
        alert("Updated");
        getTreatmentData()
      })
      .catch((err) => {
        console.log("Failed to update ");
        console.log(err.message);
      });
  }

  const deleteList=(e)=> {
    e.preventDefault();
    let _id = e.target.id;
    axios.delete(`http://localhost:8000/api/treatments/${_id}`,
    {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
  .then((res) => {
      console.log(res);
     getTreatmentData()
      
    })
    .catch((error) => console.log(error));
  };
  
  

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

          {treatment.map((record) => (
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
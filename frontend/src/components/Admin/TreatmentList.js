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

function updateList(e,dd) {
    //stops button from clearing once submitted

    e.preventDefault();
    let id = e.target.id;
    console.log(
      update, id
    );
    const to_update = treatment.filter(r => r._id === id)
    console.log(to_update)
    const temp  = {
      ...to_update[0],
      price: update.price===""? to_update[0].price: update.price,
      description: update.description===""? to_update[0].description: update.description,
      therapy: update.therapy===""? to_update[0].therapy: update.therapy,

    }
    console.log(temp)
    // use axios to update request to the database
    axios
      .put(`http://localhost:5000/api/treatments/${id}`, {
        ...temp
      },
     {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        } 
)
      //  recieves the responce of the promise then it accepts

      .then((res) => {
        setUpdate({
          _id:"",
          therapy: "",
          description: "",
          price:""
        });
        console.log(res.data);
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
    axios.delete(`http://localhost:5000/api/treatments/${_id}`,{
      headers:{
           Authorization: `Bearer ${localStorage.getItem("token")}`,

      },
      data: {
        _id: _id
      }
    })
  .then((res) => {
      console.log(res);
     getTreatmentData()
      
    })
    .catch((error) => console.log(error));
  };
  
  

  return (
    <div className="container">
   <h1 className="heading">List of treatments</h1>
   <table className="center  table table-hover table-striped bg-secondary">
        <tbody>
          <tr>
            <th></th>
            <th>Therapy</th>
            <th>Description</th>
            <th>Price</th>
            
            <th></th>
          </tr>

          {treatment.map((record) => (
            <tr    key={record._id}>
              <td>{record.id}</td>

              <td>
                <input
                  type="text"
                  defaultValue={record.therapy}
                  onChange={(evt) =>
                    setUpdate({
                     ...update,
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
                      ...update,
                      description: evt.target.value,
                    })
                  }
                />
              </td>
             <td>
                <input
                  type="text"
                  defaultValue={record.price}
                  onChange={(evt) =>
                    setUpdate({
                      ...update,
                      price: evt.target.value,
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
                  onClick={e=>updateList (e,record._id)}
                ></input>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
     
      <h2 className='title'> Add new treatments</h2>
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
 //api created using async handler
const asyncHandler = require('express-async-handler')
const Treatment = require ('../models/Treatment')
 const User =  require('../models/User')

/**const getTreatment= asyncHandler(async(res, req) =>{
 
})
 */
// g
const getTreatment = asyncHandler(async (req, res) => {
    // match the id of the user
    let treatment = {}
    console.log(req.body.id);
    if(req.body.id){
       treatment = await Treatment.find({_id: req.body.id})
    }else{
       treatment = await Treatment.find({})
    }
 
  
 // treatment found
  if (treatment) {
    // respond that treatment is found
    res.json(treatment)
  } else {
    res.status(404) // respond error treatment not found
    throw new Error('treatment not found')
  }


    
})
// get treatment by id

const getTreatmentById = asyncHandler(async (req, res) => {
  // find treatment by using user logged in  id

  console.log(req)
  // const treatment = await Treatment.findById(req.params._id)

  
  //    if (treatment) {
    
  //   res.json(treatment)
  // } else {
  //   res.status(404)
  //   throw new Error('treatment not found')
  // }
    
})



const updateTreatment = asyncHandler(async (req, res) => {
    const treatment = await Treatment.findById(req.params.id)
    
    
    if (!treatment) {treatment
        res.status(400)
        throw new Error('Treatment not found')
    }
    
    
    // Check for user
    if (!req.user) {
        res.status(401)
        throw new Error('User not found')
    }

    // Make sure the logged in user matches the todo user
    if (treatment.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    const updateTreatment = await Treatment.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })

    res.status(200).json(updateTreatment)
})


// create  treatment
const createTreatment = asyncHandler(async(req, res)=>{
console.log(req.body)
// if fields not entered the error to add field
 if(!req.body){
   res.status(400)
        throw new Error('Please add a text field')
    }
    // create new treatment
    const treatment = new Treatment({
    
     // new treatment requires models + body to validate using user
     user: req.user._id,
    therapy: req.body.therapy,
    description: req.body.description,
    price: req.body.price,
     
     
  })
 // const treatment  will wait for the promise to fufill and save 
 

  const createdTreatment = await treatment.save()
  res.status(201).json(createdTreatment)
})
 
 

// delete treatment 
const deleteTreatment = asyncHandler(async (req, res) => {
  const treatment = await Treatment.findById(req.params.id)
// if treatment found then remove itg
  if (treatment) {
    await treatment.remove()
    res.json({ message: 'treatment removed' })
  } else {
    res.status(404)
    throw new Error('treatment not found')
  }
})






module.exports={
getTreatmentById,
getTreatment,
deleteTreatment,
createTreatment,
updateTreatment
}
/** create booking 
 * delete booking
 * update booking
 * get booking
 *  with user and admin access
 * 
 * 
 * 
 */



const asyncHandler = require('express-async-handler') // import async handler to handle input and returned handler functiond
const Booking = require('../models/Booking')
 const User =  require('../models/User')
 const Treatment = require('../models/Treatment')
// import boking model
// @desc    Auth user & get token

// create new booking 
/*const setBooking = asyncHandler(async (req, res) => {
    const booking =req.body // variable from mode to require body
    console.log(req.user)
    console.log(booking)
    
    if (!booking) // if bthere are no booking items then a booking error happens
     { 
        res.status(400)
        throw new Error('no booking found')
    } else {

    }
    // create new booking from bookingItems and user to be required
    const bookings = new Booking.create({
   //therapy: req.body.therapy,
   //date: req.body.date,
   //time: req.body.time,
   //price:req.body.price
   user: req.user._id,
   treatment: req.body.treatment_id,
   ...req.body
    })
    
    createdBooking = await bookings.save()
   
    res.status(200).json(createdBooking)
    console.log(createdBooking)
})*/

const setBooking= asyncHandler(async(req, res)=>{
 console.log(req.body)
 console.log(User)

 if(!req.body){
   res.status(400)
        throw new Error('no booking found')
    }

  const newBooking = new Booking({
      ...req.body,// array of body
         user: req.user._id, // user id
    });
    await newBooking.save()
     const treatment = await Treatment.findById(req.body.treatment)
     treatment.booked= [...treatment.booked, ...req.body.books];
      await treatment.save();
      res.status.send({newBooking})
     
})




// get booking by specific id
const getBooking= asyncHandler(async(res, req) =>{
 //find booking by id
 console.log("req.user")
 console.log(req.req.user._id)
  console.log( await req["user"])

  const booking = await Booking.find({user: req.req.user._id})
  console.log(booking)
// if booking found 
  if (booking) {
    // info would be sent 
    res.res.json(booking)
  } else {
    // message booking not found
    res.status(404)
    throw new Error('booking not found')
  }

})



const updateBooking= asyncHandler(async(res, req) =>{
 const booking = await Booking.findById({_id:req.req.body.id})
 
//  if(!booking){
//     res.status(400)
//     throw new Error('booking not found')
//  }

 if (!req.req.user) {
        res.res.status(401)
        throw new Error('User not found')
    }
if (booking.user.toString() !== req.req.user.id) {
        res.res.status(401)
        throw new Error('User not authorized')
    }

      const updateBooking = await Booking.findByIdAndUpdate(req.req.body._id, req.body, {
        new: true,
    })

    res.res.status(200).json(updateBooking)






})

// this function deletes the booking
const deleteBooking= asyncHandler(async(res, req) =>{

const booking = await Booking.findById(req.req.body.id)
// if no booking 
    if (!booking) {
        res.res.status(400)
        // throw error that booking not found
        throw new Error('booking not found')
    }
    // Check for user
    if (!req.req.user) {
        res.res.status(401)
        // if user not found throw error that user not found
        throw new Error('User not found')
    }

    // turn object to string before checking if user exists
    if (booking.user.toString() !== req.req.user.id) {
        res.status(401)
        // if booking doesent is not matched to user error to show user is not authorised
        throw new Error('User not authorized')
    }

    await booking.remove()// remove booking

    res.res.json({
        id: req.req.body.id // respond to removal based on id
    })
})









module.exports={
setBooking,
getBooking,
updateBooking,
deleteBooking
}
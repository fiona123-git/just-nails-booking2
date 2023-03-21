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
const Booking = require('../models/Booking')// import booking model
// @desc    Auth user & get token

// create new booking 
const setBooking = asyncHandler(async (req, res) => {
    const {bookingItems}= req.body // variable from mode to require body
    
    
    if (!req.body.bookingItems&&bookingItems.length==0) // if there are no booking items then a booking error happens
     {
        res.status(400)
        throw new Error('please add  a field')
    } else {

    }
    // create new booking from bookingItems and user to be required
    const newBooking = await Booking.create({
        bookingItems,
        user: req.user.id,
    })

    res.status(200).json(newBooking)
})

// get booking by specific id
const getBookingbyId= asyncHandler(async(res, req) =>{
 //find booking by id
  const booking = await Booking.find({ userId: req.body.userId });
// if booking found 
  if (booking) {
    // info would be sent 
    res.json(booking)
  } else {
    // message booking not found
    res.status(404)
    throw new Error('booking not found')
  }

})



const updateBooking= asyncHandler(async(res, req) =>{
 const booking = await Booking.findById({isAdmin:true})
 
 if(!booking){
    res.status(400)
    throw new Error('booking not found')
 }

 if (!req.user) {
        res.status(401)
        throw new Error('User not found')
    }
if (booking.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }
const updateBooking = await Booking.findByIdAndUpdate({isAdmin: true
    })

    res.status(200).json(updateBooking)


})

// this function deletes the booking
const deleteBooking= asyncHandler(async(res, req) =>{

const booking = await Booking.findById(req.params.id)
// if no booking 
    if (!booking) {
        res.status(400)
        // throw error that booking not found
        throw new Error('booking not found')
    }
    // Check for user
    if (!req.user) {
        res.status(401)
        // if user not found throw error that user not found
        throw new Error('User not found')
    }

    // turn object to string before checking if user exists
    if (booking.user.toString() !== req.user.id) {
        res.status(401)
        // if booking doesent is not matched to user error to show user is not authorised
        throw new Error('User not authorized')
    }

    await booking.remove()// remove booking

    res.status(200).json({
        id: req.params.id // respond to removal based on id
    })
})









module.exports={
setBooking,
getBookingbyId,
updateBooking,
deleteBooking
}
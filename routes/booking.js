const express = require('express') // import express


const router = express.Router()
const {
setBooking,
getBookingbyId,
updateBooking,
deleteBooking
  
} = require ('../controllers/booking.js') // import controller  for routes
const { protect, admin } = require('../middleware/authMiddleware') // protected routes by admin

//


router
  .route('/:id')
  .get(getBookingbyId)
  .delete(protect, admin, deleteBooking)
  .put(protect, admin, updateBooking)
  .post(setBooking)
  




  module.exports = router

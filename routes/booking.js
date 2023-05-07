const express = require('express') // import express


const router = express.Router()
const {
setBooking,
getBooking,
updateBooking,
deleteBooking
  
} = require ('../controllers/booking.js') // import controller  for routes
const { protect, admin } = require('../middleware/authMiddleware') // protected routes by admin

//

router.route('/').post(protect, setBooking)


router
  .route('/:id')
  .get(getBooking)
  .delete(protect, admin, deleteBooking)
  .put(protect, admin, updateBooking)
  .post(setBooking)
  




  module.exports = router

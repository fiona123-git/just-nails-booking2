const express = require('express') // import express


const router = express.Router()
const {
setBooking,
getBooking,
updateBooking,
deleteBooking
  
} = require ('../controllers/booking.js') // import controller  for routes
const { protect} = require('../middleware/authMiddleware') // protected routes by admin

//

router.route('/').post(protect, setBooking)
router.get('/all',protect,getBooking)

router
  .route('/')
  .get(protect,getBooking)
  .delete(protect,  deleteBooking)
  .put(protect,  updateBooking)
  .post(setBooking)
  




  module.exports = router

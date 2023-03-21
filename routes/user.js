// create router for routes
const express = require('express') // import express
const router = express.Router() // import router
const {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  getUser
} = require('../controllers/user') //routes from user controller





const { protect, admin } = require ('../middleware/authMiddleware') //middleware for admin authentication



router.get('/me',protect,getUser)

// routes for api
router.route('/').post(registerUser).get(protect, admin, getUsers) 
router.post('/login', authUser)
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)
router
  .route('/:id')
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser)

module.exports = router

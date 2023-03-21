const express = require('express')

const router = express.Router()
const {
  getTreatment,
  getTreatmentById,
  deleteTreatment,
  createTreatment,
  updateTreatment,
  
} = require ('../controllers/treatment.js')
const { protect, admin } = require('../middleware/authMiddleware')

router.route('/').get(getTreatment).post(protect, admin, createTreatment)


router
  .route('/:id')
  .get(getTreatmentById)
  .delete(protect, admin, deleteTreatment)
  .put(protect, admin, updateTreatment)

  module.exports = router

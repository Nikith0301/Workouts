const express = require('express')
const mongoose= require ('mongoose')
const {
  createWork,
  getWorks,
  getWork,
  deleteWork,
  updateWork
} = require('../controllers/workoutController.cjs')

const requireAuth=require('../middleware/requireAuth.cjs')
// const Work=require('../models/WorkModel.cjs')
const router = express.Router()

router.use(requireAuth)
// GET all Works
router.get('/', getWorks)

//GET a single Work
router.get('/:id', getWork)

// POST a new Work
router.post('/', createWork
)

// DELETE a Work
router.delete('/:id', deleteWork)

// UPDATE a Work
router.patch('/:id', updateWork)


module.exports = router
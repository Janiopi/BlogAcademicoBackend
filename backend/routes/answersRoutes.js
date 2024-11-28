const express = require('express')
const router = express.Router();
const {createNewAnswer} = require('../controllers/answersController.js')

const {checkAuthenticated,checkNotAuthenticated} = require('../middleware/authMiddleware.js') 


router.get('/new',createNewAnswer)





module.exports = router;
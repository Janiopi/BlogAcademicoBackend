const express = require('express')
const router = express.Router();
const {getAllQuestions} = require('../controllers/apiController.js')


//Read
router.get('/questions/urls',getAllQuestions)




module.exports = router;

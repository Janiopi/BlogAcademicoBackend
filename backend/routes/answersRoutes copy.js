const express = require('express')
const router = express.Router();
const {createNewAnswer,showAnswerById,updateContentQuestion,deleteAnswerr} = require('../controllers/answersController.js')

const {checkAuthenticated,checkNotAuthenticated} = require('../middleware/authMiddleware.js') 

//Create
router.post('/new',checkAuthenticated,createNewAnswer)

//Read
router.get('/:id',showAnswerById)

//Update
router.put('/updateContent',checkAuthenticated,updateContentQuestion)

//Delete
router.delete('/delete',checkAuthenticated,deleteAnswerr)



module.exports = router;
const express = require('express')
const router = express.Router();
const {createNewAnswer,showAnswerById,updateContentQuestion,deleteAnswerr} = require('../controllers/answersController.js')

const {checkAuthenticated,checkNotAuthenticated} = require('../middleware/authMiddleware.js') 

//Create
router.post('/new',createNewAnswer)

//Read
router.get('/:id',showAnswerById)

//Update
router.put('/updateContent',updateContentQuestion)

//Delete
router.delete('/delete',deleteAnswerr)



module.exports = router;
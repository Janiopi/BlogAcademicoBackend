const express = require('express')
const router = express.Router();
const {showAllQuestions,questionById,createNewQuestion,updateTitleQuestion,updateDescQuestion,updateTagsQuestion,deleteQuestionn} = require('../controllers/questionController.js')
const {checkAuthenticated,checkNotAuthenticated} = require('../middleware/authMiddleware.js') 


//Create
router.post('/new',createNewQuestion)
//Read
router.get('/all',showAllQuestions)
router.get('/:id/:slug',questionById)
//Update
router.put('/updateTitle',updateTitleQuestion)
router.put('/updateDesc',updateDescQuestion)    
router.put('/updateTags',updateTagsQuestion)
//Delete
router.delete('/delete',deleteQuestionn)



module.exports = router;
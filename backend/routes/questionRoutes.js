const express = require('express')
const router = express.Router();
const {showAllQuestions,questionById,createNewQuestion} = require('../controllers/questionController.js')
const {checkAuthenticated,checkNotAuthenticated} = require('../middleware/authMiddleware.js') 

router.get('/all',showAllQuestions)


router.get('/:id',questionById)

router.post('/new',createNewQuestion)



module.exports = router;
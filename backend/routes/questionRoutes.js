const express = require('express')
const router = express.Router();
const {showAllQuestions,questionById,createNewQuestion,updateTitleQuestion,updateDescQuestion,updateTagsQuestion} = require('../controllers/questionController.js')
const {checkAuthenticated,checkNotAuthenticated} = require('../middleware/authMiddleware.js') 

router.get('/all',showAllQuestions)


router.get('/:id',questionById)

router.post('/new',createNewQuestion)

router.put('/updateTitle',updateTitleQuestion)
router.put('/updateDesc',updateDescQuestion)
router.put('/updateTags',updateTagsQuestion)

module.exports = router;
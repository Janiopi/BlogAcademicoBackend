const express = require('express')
const router = express.Router();
const {createNewComment,showCommentById,updateContentComment,deleteCommentt} = require('../controllers/commentsController.js')

const {checkAuthenticated,checkNotAuthenticated} = require('../middleware/authMiddleware.js') 

//Create
router.post('/new',checkAuthenticated,createNewComment)

//Read
router.get('/:id',showCommentById)

//Update
router.put('/updateContent',checkAuthenticated,updateContentComment)

//Delete
router.delete('/delete',checkAuthenticated,deleteCommentt)



module.exports = router;
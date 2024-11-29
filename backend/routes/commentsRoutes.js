const express = require('express')
const router = express.Router();
const {createNewComment,showCommentById,updateContentComment,deleteCommentt} = require('../controllers/commentsController.js')

const {checkAuthenticated,checkNotAuthenticated} = require('../middleware/authMiddleware.js') 

//Create
router.post('/new',createNewComment)

//Read
router.get('/:id',showCommentById)

//Update
router.put('/updateContent',updateContentComment)

//Delete
router.delete('/delete',deleteCommentt)



module.exports = router;
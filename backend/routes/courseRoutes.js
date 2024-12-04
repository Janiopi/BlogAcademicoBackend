const express = require('express')
const router = express.Router();
const {createNewCourse,findCourse,updateName,updateTags,updateTeacher,updateDesc,deleteCourse} = require('../controllers/courseController.js')
const {checkAuthenticated,checkNotAuthenticated} = require('../middleware/authMiddleware.js') 


//Create
router.post('/new',createNewCourse)
//Read
router.get('/:id',findCourse)
//Update
router.put('/updateName',updateName)
router.put('/updateTags',updateTags)
router.put('/updateTeacher',updateTeacher)
router.put('/updateDesc',updateDesc)
//Delete
router.delete('/delete',deleteCourse)



module.exports = router;
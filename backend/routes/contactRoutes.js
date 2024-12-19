const express = require('express')
const router = express.Router();
const {createNewContact,findContact,findAllContact} = require('../controllers/contactController.js')



//Create
router.post('/new',createNewContact)

//Read
router.get('/all',findAllContact)
router.get('/:id',findContact)


//Update


//Delete




module.exports = router;
const express = require('express')
const router = express.Router();
const { uploadNewPDF, downloadPDF } = require("../controllers/resourcesController")
const {upload} = require("../middleware/PDFMiddleware")


//Create
router.post('/uploadPDF',upload.single('pdf'),uploadNewPDF)
router.get('/downloadPDF',downloadPDF)

module.exports = router

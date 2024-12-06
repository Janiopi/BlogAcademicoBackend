const express = require('express')
const router = express.Router();
const { uploadNewPDF,downloadPDF,uploadNewVideo,getVideo } = require("../controllers/resourcesController")
const {upload} = require("../middleware/PDFMiddleware")


//Create
router.post('/uploadPDF',upload.single('pdf'),uploadNewPDF)
router.post('/uploadVideo',uploadNewVideo)

//Read
router.get('/downloadPDF',downloadPDF)
router.get('/getVideo',getVideo)





module.exports = router

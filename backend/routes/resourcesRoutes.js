const express = require('express')
const router = express.Router();
const { uploadNewMedia,downloadMedia,uploadNewVideo,getVideo } = require("../controllers/resourcesController")
const {upload} = require("../middleware/MediaMiddleware")


//Create
router.post('/uploadMedia',upload.single('Media'),uploadNewMedia)
router.post('/uploadVideo',uploadNewVideo)

//Read
router.get('/downloadMedia',downloadMedia)
router.get('/getVideo',getVideo)





module.exports = router


const {uploadMedia,retrieveMedia,uploadVideo,retrieveVideo} = require('../models/resourcesModel.js')
const {extractYouTubeID} = require('../utils/extractYoutubeId.js')

const uploadNewMedia = async(req,res)=>{
    try{
        const{ courseId,title} = req.body;
        const filePath = req.file?.path
        if(!courseId||!filePath||!title){
            return res.status(400).json({error: 'Missing required fields'});
        }
        console.log('Req Body:',req.body)
        console.log('Uploaded Files:', req.file); // For uploaded file(s)
        const result = await uploadMedia({courseId,filePath,title})
        res.status(201).json(result);
    }catch(err){
        console.log("Error :(")
        console.error(err.messsage)
        res.status(500).send('Server error')
    }
}

const downloadMedia = async(req,res)=>{
    try{
        console.log('Req body:',req.body)
        const{id}=req.body;
        
        if(!id){
            return res.status(400).json({error:'Missing required fields'});
        }
        const result = await retrieveMedia({id})
        console.log(result.url)
        console.log('Descargando...')
        res.download(result.url)
    }catch(err){
        console.log('Error :(')
        console.error(err.messsage)
        res.status(500).send('Server error')
    }   
}

const uploadNewVideo = async(req,res)=>{
   

    try{
        const{courseId,url,title}=req.body;
        const videoId = extractYouTubeID(url);
    
        if(!courseId||!videoId||!title){
            return res.status(400).json({error:'Missing required fields'});
        }
        console.log('Req Body:',req.body)
        console.log('Video ID:', videoId);  
        const result = await uploadVideo({courseId,videoId,title})
        res.status(201).json(result);
    }catch(err){
        console.log("Error :(")
        console.error(err.messsage)
        res.status(500).send('Server error')
    }



}

const getVideo = async(req,res)=>{
    try{
        console.log('Req body:',req.body)
        const{id}=req.body;
        
        if(!id){
            return res.status(400).json({error:'Missing required fields'});
        }
        const result = await retrieveVideo({id})
        res.status(201).json(result);
        
        
    }catch(err){
        console.log('Error :(')
        console.error(err.messsage)
        res.status(500).send('Server error')
    }   
}


module.exports = {uploadNewMedia,downloadMedia,uploadNewVideo,getVideo}



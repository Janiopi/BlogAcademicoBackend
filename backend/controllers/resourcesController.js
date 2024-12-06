
const {uploadPDF,retrievePDF,uploadVideo,retrieveVideo} = require('../models/resourcesModel.js')


const uploadNewPDF = async(req,res)=>{
    try{
        const{ courseId,title} = req.body;
        const filePath = req.file?.path
        if(!courseId||!filePath||!title){
            return res.status(400).json({error: 'Missing required fields'});
        }
        console.log('Req Body:',req.body)
        console.log('Uploaded Files:', req.file); // For uploaded file(s)
        const result = await uploadPDF({courseId,filePath,title})
        res.status(201).json(result);
    }catch(err){
        console.log("Error :(")
        console.error(err.messsage)
        res.status(500).send('Server error')
    }
}

const downloadPDF = async(req,res)=>{
    try{
        console.log('Req body:',req.body)
        const{id}=req.body;
        
        if(!id){
            return res.status(400).json({error:'Missing required fields'});
        }
        const result = await retrievePDF({id})
        console.log(result.url)
        console.log('Descargando...')
        res.download(result.url)
    }catch(err){
        console.log('Error :(')
        console.error(err.messsage)
        res.status(500).send('Server error')
    }   
}

function extractYouTubeID(url) {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null; // Return the ID if matched, otherwise null
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


module.exports = {uploadNewPDF,downloadPDF,uploadNewVideo,getVideo}



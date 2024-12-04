
const {uploadPDF,retrievePDF} = require('../models/resourcesModel.js')


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



module.exports = {uploadNewPDF,downloadPDF}



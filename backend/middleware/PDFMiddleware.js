const multer = require('multer')
const path = require('path')
const fs = require('fs')

//Asegura que el directorio exista
const uploadDir = '../uploads';
if(!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir,{recursive:true});
}

//Set up Multer
const storage = multer.diskStorage({
     destination: (req,file,cb) =>{
         cb(null,uploadDir); //Directorio para archivos subidos
     },
     filename: (req,file,cb) =>{
        const filename = `${Date.now()}-${file.originalname}`; 
        cb(null,filename);
     },
 
 });

const upload =  multer({storage});

module.exports={upload}
 
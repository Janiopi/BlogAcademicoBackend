// Los controladores se encargan de manejar las solicitudes HTTP


const {getQuestions} = require('../models/apiModel');

//Create

const getAllQuestions = async(req,res)=>{
   
   
    try{
        const result = await getQuestions()
        const baseUrl = 'http://localhost:4000/questions';
        
        const urls = result.rows.map((row) => ({
            //id: row.id,
            //slug: row.slug,
            url: `${baseUrl}/${row.id}/${row.slug}`,
        }));
    
        res.json(urls)
       
    }catch(err){
        console.error('Error retrieving questions urls',err.message)
        res.status(500).send('Server error')
    }



}

module.exports = {getAllQuestions};





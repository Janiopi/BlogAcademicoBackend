// Los controladores se encargan de manejar las solicitudes HTTP


const {newAnswer} = require('../models/answersModel.js');


const createNewAnswer = async(req,res)=>{
   
   
    try{
        const{ question_id, user_id, content} = req.body;

        if( !question_id||!user_id||!content){
            return res.status(400).json({error: 'Missing fields'});

        }


        const answer = await newAnswer({question_id, user_id, content});
        res.status(201).json(result)
    }catch(err){
        console.error(err.message)
        res.status(500).send('Server error')
    }



}
module.exports = {createNewAnswer};





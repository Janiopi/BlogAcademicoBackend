// Los controladores se encargan de manejar las solicitudes HTTP

const { json } = require('express');
const {newAnswer,findAnswersById,updateQuestionContent,deleteAnswer} = require('../models/answersModel.js');

//Create

const createNewAnswer = async(req,res)=>{
   
   
    try{
        const{ question_id, user_id, content} = req.body;
        console.log(req.body)

        if( !question_id||!user_id||!content){
            return res.status(400).json({error: 'Missing fields'});

        }


        const answer = await newAnswer({question_id, user_id, content});
        res.status(201).json(answer)
    }catch(err){
        console.error(err.message)
        res.status(500).send('Server error')
    }



}

//Read

const showAnswerById = async (req, res) => {
    const { id } = req.body;
  
    
    if (!id) {
      return res.status(400).json({ error: 'Invalid answer ID' });
    }
  
    try {
      
      const answers = await findAnswersById(id);
      res.status(200).json({ answers });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
};

//Update

const updateContentQuestion = async (req,res) =>{
    const {id,new_content} = req.body;

    if(!id||!new_content){
        return res.status(400).json({error:'Invalid question ID'});
    }
    try{
        const result = await updateQuestionContent({id,new_content});
        res.status(201).json(result);
    }catch{
        console.error(err.message)
        res.status(500).send('Server error')
    }

}

//Delete
const deleteAnswerr = async(req,res)=>{
    try{
        const {id} = req.body;
        if(!id){
            return res.status(400).json({error:'Missing required fields'});
        }
        const result = await deleteAnswer({id});
        res.status(201).json(result);

    }catch(err){
        console.error(err.message)
        res.status(500).send('Server error')
    }
}

module.exports = {createNewAnswer,showAnswerById,updateContentQuestion,deleteAnswerr};





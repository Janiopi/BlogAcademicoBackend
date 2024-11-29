// Los controladores se encargan de manejar las solicitudes HTTP

const { json } = require('express');
const {newComment,findCommentById,updateCommentContent,deleteComment} = require('../models/commentsModel.js');

//Create

const createNewComment = async(req,res)=>{
   
   
    try{
        const{ answer_id, user_id, content} = req.body;
        console.log(req.body)

        if( !answer_id||!user_id||!content){
            return res.status(400).json({error: 'Missing fields'});

        }


        const comment = await newComment({answer_id, user_id, content});
        res.status(201).json(comment)
    }catch(err){
        console.error(err.message)
        res.status(500).send('Server error')
    }



}

//Read

const showCommentById = async (req, res) => {
    const { id } = req.params;
    
    
    if (!id) {
      return res.status(400).json({ error: 'Invalid answer ID' });
    }
  
    try {
      
      const answers = await findCommentById(id);
      res.status(200).json({ answers });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
};

//Update

const updateContentComment = async (req,res) =>{
    const {id,new_content} = req.body;

    if(!id||!new_content){
        return res.status(400).json({error:'Invalid question ID'});
    }
    try{
        const result = await updateCommentContent({id,new_content});
        res.status(201).json(result);
    }catch{
        console.error(err.message)
        res.status(500).send('Server error')
    }

}

//Delete
const deleteCommentt = async(req,res)=>{
    try{
        const {id} = req.body;
        if(!id){
            return res.status(400).json({error:'Missing required fields'});
        }
        const result = await deleteComment({id});
        res.status(201).json(result);

    }catch(err){
        console.error(err.message)
        res.status(500).send('Server error')
    }
}

module.exports = {createNewComment,showCommentById,updateContentComment,deleteCommentt};





// Los controladores se encargan de manejar las solicitudes HTTP


const { allQuestions, findQuestionById, newQuestion,updateQuestionTitle,updateQuestionDesc,updateQuestionTags, deleteQuestion} = require('../models/questionModel.js');
const {findAnswersById} = require('../models/answersModel.js')
//Create

const createNewQuestion = async(req,res)=>{

    try{
        const { user_id, title, description, tags } = req.body;

        if (!user_id || !title || !description) {
            return res.status(400).json({ error: 'Missing required fields' });
         }

        

        const result = await newQuestion({ user_id, title, description, tags});
        res.status(201).json(result);        
    }catch(err){
        console.error(err.message)
        res.status(500).send('Server error')
    }

}
// Read
const showAllQuestions = async(req,res)=>{
    
    try{
        const questions = await allQuestions();
        res.json(questions);
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error')
    }
  
}


const questionById = async (req, res) => {
    const { id } = req.params;
  
    
    if (!id || isNaN(id) || parseInt(id) <= 0) {
      return res.status(400).json({ error: 'Invalid question ID' });
    }
  
    try {
      
      const question = await findQuestionById(id);
      const answers = await findAnswersById(id);
  
      
      if (!question) {
        return res.status(404).json({ error: 'Question not found' });
      }
  
      
      res.status(200).json({ question, answers });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
};
  

//Update

const updateTitleQuestion = async(req,res)=>{
    try{
        const {id, new_title}=req.body;

        if(!id||!new_title){
            return res.status(400).json({error:'Missing required fields'});
        }
        const result = await updateQuestionTitle({id,new_title});
        res.status(201).json(result);
       
    }catch(err){
        console.error(err.message)
        res.status(500).send('Server error')
    }


}
const updateDescQuestion = async(req,res)=>{
    try{
        const {id, new_desc}=req.body;

        if(!id||!new_desc){
            return res.status(400).json({error:'Missing required fields'});
        }
        const result = await updateQuestionDesc({id,new_desc});
        res.status(201).json(result);
       
    }catch(err){
        console.error(err.message)
        res.status(500).send('Server error')
    }


}
const updateTagsQuestion = async(req,res)=>{
    try{
        const {id, new_tags}=req.body;

        if(!id||!new_tags){
            return res.status(400).json({error:'Missing required fields'});
        }
        const result = await updateQuestionTags({id,new_tags});
        res.status(201).json(result);
       
    }catch(err){
        console.error(err.message)
        res.status(500).send('Server error')
    }


}

//Delete
const deleteQuestionn = async(req,res)=>{
    try{
        const {id} = req.body;
        if(!id){
            return res.status(400).json({error:'Missing required fields'});
        }
        const result = await deleteQuestion({id});
        res.status(201).json(result);

    }catch(err){
        console.error(err.message)
        res.status(500).send('Server error')
    }
}

module.exports = {showAllQuestions,questionById,createNewQuestion,updateTitleQuestion,updateTagsQuestion,updateDescQuestion,deleteQuestionn};



// Los controladores se encargan de manejar las solicitudes HTTP


const { allQuestions, findQuestionById, findAnswersById, newQuestion } = require('../models/questionModel.js');


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
  

const createNewQuestion = async(req,res)=>{

    try{
        const { user_id, title, description, tags } = req.body;

        if (!user_id || !title || !description) {
            return res.status(400).json({ error: 'Missing required fields' });
         }

        const result = await newQuestion({ user_id, title, description, tags });
        res.status(201).json(result);        
    }catch(err){
        console.error(err.message)
        res.status(500).send('Server error')
    }

}

module.exports = {showAllQuestions,questionById,createNewQuestion};



 // Los modelos son responsables de interactuar con la DB

const {pool} = require('../config/dbConfig.js') 

//Create

const newAnswer = async ({ question_id, user_id, content }) => {
  const result = await pool.query(
    'INSERT INTO answers (question_id, user_id, content) VALUES ($1, $2, $3) RETURNING *',
    [question_id, user_id, content]
  );
  
};

//Read

const findAnswersById= async(id)=>{
    
  const result = await pool.query('SELECT * FROM answers where id = $1',[id]);
  return result.rows;
}

//Update

const updateQuestionContent = async ({id,new_content})=>{
  const result = await pool.query(
    'UPDATE answers SET content = $2 WHERE id=$1',
    [id,new_content]
  )
  return result.rows[0]; 
};



//Delete

const deleteAnswer = async ({ id }) => {
  const result = await pool.query(
    'DELETE FROM answers WHERE id = $1',[id]);
  return result.rows[0]; 
};









module.exports = {newAnswer,findAnswersById,updateQuestionContent,deleteAnswer}
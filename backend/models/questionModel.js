// Los modelos son responsables de interactuar con la DB

const {pool} = require('../config/dbConfig.js')

const allQuestions = async()=>{
    const result = await pool.query('SELECT * FROM questions ORDER BY created_at DESC')
    return result.rows;

}


const findQuestionById= async(id)=>{
    
    const result = await pool.query('SELECT * FROM questions where id = $1',[id]);
    return result.rows[0];
}




const newQuestion = async ({ user_id, title, description, tags }) => {
    const result = await pool.query(
      'INSERT INTO questions (user_id, title, description, tags) VALUES ($1, $2, $3, $4) RETURNING *',
      [user_id, title, description, tags]
    );
    return result.rows[0]; 
};

const updateQuestionTitle = async ({id,new_title})=>{
    const result = await pool.query(
      'UPDATE questions SET title = $2 WHERE id=$1',
      [id,new_title]
    )
    return result.rows[0]; 
};

const updateQuestionDesc = async ({id,new_desc})=>{
  const result = await pool.query(
    'UPDATE questions SET description = $2 WHERE id=$1',
    [id,new_desc]
  )
  return result.rows[0]; 
};

const updateQuestionTags = async ({id,new_tags})=>{
  const result = await pool.query(
    'UPDATE questions SET tags = $2 WHERE id=$1',
    [id,new_tags]
  )
  return result.rows[0]; 
};




const deleteQuestion = async ({ id }) => {
  const result = await pool.query(
    'DELETE FROM questions WHERE id = $1',[id]);
  return result.rows[0]; 
};



module.exports = {
  allQuestions,
  findQuestionById,
   newQuestion,
  deleteQuestion,
  updateQuestionTitle,
  updateQuestionDesc,
  updateQuestionTags,
  
};
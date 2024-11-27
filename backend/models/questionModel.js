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


const findAnswersById= async(id)=>{
    
    const result = await pool.query('SELECT * FROM answers where id = $1',[id]);
    return result.rows[0];
}


const newQuestion = async ({ user_id, title, description, tags }) => {
    const result = await pool.query(
      'INSERT INTO questions (user_id, title, description, tags) VALUES ($1, $2, $3, $4) RETURNING *',
      [user_id, title, description, tags]
    );
    return result.rows[0]; 
};


module.exports = {
  allQuestions,
  findQuestionById,
  findAnswersById,
    newQuestion,
  
  
};
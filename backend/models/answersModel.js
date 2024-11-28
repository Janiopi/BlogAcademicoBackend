 // Los modelos son responsables de interactuar con la DB

const {pool} = require('../config/dbConfig.js') 


const findAnswersById= async(id)=>{
    
    const result = await pool.query('SELECT * FROM answers where id = $1',[id]);
    return result.rows;
}


const newAnswer = async ({ question_id, user_id, content }) => {
    const result = await pool.query(
      'INSERT INTO answers (question_id, user_id, content) VALUES ($1, $2, $3) RETURNING *',
      [question_id, user_id, content]
    );
    return result.rows[0]; 
};






module.exports = {findAnswersById,newAnswer}
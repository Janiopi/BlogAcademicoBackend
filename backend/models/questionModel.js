// Los modelos son responsables de interactuar con la DB

const {pool} = require('../config/dbConfig.js')
const {createSlug} = require('../utils/slug.js')
const {addBackSlash} = require('../utils/backSlashManage.js')

//Create

const newQuestion = async ({ user_id, title, description, tags }) => {
  console.log({"Titulo":title})
  slug = createSlug(title)
  new_title = addBackSlash(title)   //Evitar caracteres escape '\'

  new_description = addBackSlash(description)


  console.log({new_title})
  const result = await pool.query(
    'INSERT INTO questions (user_id, title, description, tags,slug) VALUES ($1, $2, $3, $4,$5) RETURNING *',
    [user_id, new_title, new_description, tags,slug]
  );
  return result.rows[0]; 
};

//Read

const allQuestions = async()=>{
    const result = await pool.query('SELECT * FROM questions ORDER BY created_at DESC')
    return result.rows;
    
}


const findQuestionById= async(id)=>{
    
    const result = await pool.query('SELECT * FROM questions where id = $1',[id]);
    return result.rows[0];
}


//Update

const updateQuestionTitle = async ({id,new_title})=>{
  slug = createSlug(new_title) 
  new_title = addBackSlash(new_title)
  const result = await pool.query(
      'UPDATE questions SET title = $2,slug=$3 WHERE id=$1',
      [id,new_title,slug]
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


//Delete

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
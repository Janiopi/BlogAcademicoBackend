 // Los modelos son responsables de interactuar con la DB

 const {pool} = require('../config/dbConfig.js') 

 //Create
 
 const newComment = async ({ answer_id, user_id, content }) => {
   const result = await pool.query(
     'INSERT INTO comments (answer_id, user_id, content) VALUES ($1, $2, $3) RETURNING *',
     [answer_id, user_id, content]
   );
   
 };
 
 //Read
 
 const findCommentById= async(id)=>{
     
   const result = await pool.query('SELECT * FROM comments where id = $1',[id]);
   return result.rows;
 }
 
 //Update
 
 const updateCommentContent = async ({id,new_content})=>{
   const result = await pool.query(
     'UPDATE comments SET content = $2 WHERE id=$1',
     [id,new_content]
   )
   
 };
 
 
 
 //Delete
 
 const deleteComment = async ({ id }) => {
   const result = await pool.query(
     'DELETE FROM comments WHERE id = $1',[id]);
   
 };
 
  
 
 
 
 module.exports = {newComment,findCommentById,updateCommentContent,deleteComment}
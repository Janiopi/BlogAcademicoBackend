 // Los modelos son responsables de interactuar con la DB

 const {pool} = require('../config/dbConfig.js') 

 
 //Read
 
 const getQuestions= async()=>{
     
   const result = await pool.query('SELECT id,slug FROM questions');
   return result;
 }
 
 
 module.exports = {getQuestions}
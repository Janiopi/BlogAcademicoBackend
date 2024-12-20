 // Los modelos son responsables de interactuar con la DB

 const {pool} = require('../config/dbConfig.js') 

 //Create
const newContact = async({email,topic,message})=>{
    const result = await pool.query(
        'INSERT INTO contact (email,topic,message) VALUES ($1,$2,$3) RETURNING *',
        [email,topic,message]

    );
    return result.rows[0]
}

 //Read
const findContactById= async(id)=>{
    const result = await pool.query('SELECT * FROM contact where id = $1',[id]);
   return result.rows[0];
}


const findContactAll = async(id)=>{
    const result = await pool.query('SELECT * FROM contact');
    return result.rows;
}
 
 //Update
 
 
 //Delete
 
 
 
 
 module.exports = {newContact,findContactAll,findContactById}
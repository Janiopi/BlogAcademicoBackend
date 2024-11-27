// Los modelos son responsables de interactuar con la DB

const bcrypt = require('bcrypt')
const {pool} = require('../config/dbConfig')


const findUserByEmail = async(email)=>{
    const result = await pool.query('SELECT * FROM users WHERE email = $1',[email]);
    return result.rows[0];
}


const createUser = async(name,email,hashedPassword)=>{
    const result = await pool.query(
        'INSERT INTO users (name,email,password) VALUES ($1,$2,$3) RETURNING id,password',
        [name,email,hashedPassword]


    );
    return result.rows[0];

};


module.exports = {
    findUserByEmail,
    createUser

};
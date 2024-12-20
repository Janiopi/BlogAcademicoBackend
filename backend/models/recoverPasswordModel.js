const {pool} = require('../config/dbConfig')

const setToken = async({token,expires,email})=>{
    const result = await pool.query(
        'UPDATE users SET reset_token = $1, reset_token_expires = $2 WHERE email = $3 RETURNING *',
        [token, expires, email]
    );
    return result
}

const verifyToken = async({token})=>{
    const result = await pool.query(
        'SELECT * FROM users WHERE reset_token = $1 AND reset_token_expires > NOW()',
        [token]

    );
   return result.rows[0]


}

const updatePassword = async({token,hashedPassword})=>{
    const result = await pool.query(
        'UPDATE users SET password = $1, reset_token = NULL, reset_token_expires = NULL WHERE reset_token = $2',
        [hashedPassword,token]
    );
}

module.exports = {setToken,verifyToken,updatePassword}

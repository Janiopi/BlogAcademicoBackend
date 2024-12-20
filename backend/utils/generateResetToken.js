const crypto = require('crypto');
const {setToken} = require('../models/recoverPasswordModel.js')


async function generateResetToken(email) {
    //Random token
    const token = crypto.randomBytes(32).toString('hex');
    const expires = new Date(Date.now() + 3600000);//1 hora 60*60*10³ ms

    const result = await setToken({token,expires,email})
    
    if (result.rowCount === 0) {
        console.log('Email not found')
        throw new Error('Email not found');
    }

    return token;
}

module.exports = {generateResetToken}
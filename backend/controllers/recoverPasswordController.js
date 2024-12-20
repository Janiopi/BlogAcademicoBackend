
const {generateResetToken} = require('../utils/generateResetToken');
const {sendResetEmail} = require('../utils/emailRecovery')
const {setToken,verifyToken,updatePassword} = require('../models/recoverPasswordModel')
const bcrypt = require('bcrypt');

const forgotPassword = async(req,res)=>{
    try{
        
        const { email } = req.body;
        console.log('Generando Token ')
        const token = await generateResetToken(email);
        console.log('Token generado ')
        await sendResetEmail(email, token);
        console.log('Correo enviado')
        res.status(200).json({ message: 'Password reset email sent' });
    }
    catch(error){
        console.error(error);
        res.status(400).json({ error: error.message });
    }


}

const recoverPassword = async(req,res)=>{
    try{
        console.log('Trying to recover password')
        const{token} = req.params;
        const{newPassword} = req.body;
        const tokenIsActive = verifyToken({token});
        console.log('Token verified')
        if(tokenIsActive.rowCount === 0){
            return res.status(400).json({error:'Invalid or expired token'});
        }
        const hashedPassword = await bcrypt.hash(newPassword,10);
        const result = await updatePassword({token,hashedPassword});
        res.status(200).json({ message: 'Password reset successfully' });

    }catch(error){
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }   


}


module.exports = {forgotPassword,recoverPassword}

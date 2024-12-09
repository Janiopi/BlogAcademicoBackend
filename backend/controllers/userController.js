// Los controladores se encargan de manejar las solicitudes HTTP

const bcrypt = require('bcrypt');
const {findUserByEmail, createUser}= require('../models/userModel.js')
const passport = require('passport');
const pool = require('../config/dbConfig.js').pool;

const registerUser = async(req,res)=>{
    let{name,email,password,password2} = req.body;
    let errors = [];

    
    if(!name || !email || !password || !password2 ){
        errors.push({message: 'Campos incompletos!'})
    }

    if(password.length < 6 ){
        errors.push({message: 'Contraseña débil. Su longitud debe ser mayor a 5'})
    }

    if(password != password2){
        errors.push({message: 'Contraseñas no coinciden'})
    }


    if(errors.length > 0){
        return res.render('register',{errors});
    }else{
        const hashedPassword = await bcrypt.hash(password,10);

        const existingUser = await findUserByEmail(email);
        if(existingUser){
            errors.push({message:'Email ya registrado'});
            return res.render('register',{errors});
        }

        await createUser(name,email,hashedPassword);
        req.flash('sucess_msg','Ahora ya está registrado, por favor inicie sesión')
        res.redirect('/users/login')



    }

}


const loginUser = passport.authenticate('local',{
    successRedirect: '/users/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true,
    successFlash: 'Ha iniciado sesión satisfactoriamente'



});




module.exports = {registerUser,loginUser};


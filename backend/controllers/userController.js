// Los controladores se encargan de manejar las solicitudes HTTP

const bcrypt = require('bcrypt');
const {findUserByEmail, createUser,changePassword}= require('../models/userModel.js')
const passport = require('passport');
const pool = require('../config/dbConfig.js').pool;

const registerUser = async(req,res)=>{
    let{name,email,password,password2} = req.body;
    let errors = [];
    console.log("name:",name)
    console.log("email:",email)
    console.log("password:",password)
    console.log("password2:",password2)

    
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
        console.log(errors)
        return res.status(400).json({message:'Register failed',errors})
        
    }
    else{
        const hashedPassword = await bcrypt.hash(password,10);

        const existingUser = await findUserByEmail(email);
        if(existingUser){
            errors.push({message:'Email ya registrado'});
            console.log(errors)
            return res.status(500).json({message:'Register failed',errors})
        }

        await createUser(name,email,hashedPassword);
        //req.flash('sucess_msg','Ahora ya está registrado, por favor inicie sesión')
        //res.redirect('/users/login')
        return res.status(201).json({
            message: 'Register succesful!',
            user: {name,email},
        });


    }

}


const loginUser = (req,res,next) =>{
    passport.authenticate('local',(err,user,info)=>{
        if(err){
            console.error('Error:',err);
            return res.status(500).json({message:'An internal error  ocurred :('})
        }
        if(!user){
            return res.status(401).json({mesage:'Invalid credentials'})
        }
        req.logIn(user, (err)=>{
            if(err){
                return res.status(500).json({mesage:'Login failed'});
            }
            
            return res.json({
                message: 'Login succesful!',
                user: {id:user.id, email:user.email},
            });



        })
    
        console.log('User:',user);
        console.log('Info:',info);
        /*
        successRedirect: '/users/dashboard',
        failureRedirect: '/users/login',
        failureFlash: true,
        successFlash: 'Ha iniciado sesión satisfactoriamente'
    */
    
    
    })(req,res,next);
    
    
    
}
    
const changeUserPassword = async(req,res)=>{
    console.log(req.body)
    let{email,newpassword,newpassword2} = req.body
    let errors = [];



    if(!email || !newpassword || !newpassword2 ){
        errors.push({message: 'Campos incompletos!'})
    }

    if(password != password2){
        errors.push({message: 'Contraseñas no coinciden'})
    }
    if(errors.length > 0){
        console.log(errors)
        return res.status(400).json({message:'Change Password Failed',errors})
        
    }else{
        const hashedPassword = await bcrypt.hash(newpassword,10);
        const existingUser = await findUserByEmail(email);
        if(existingUser){
            const response = await changePassword(email,hashedPassword)
            return res.json({
                message: 'Password updated succesfuly!',
                user: {id:user.id, email:user.email},
            });
        }else{
            return res.status(404).json({mesage:'Email not found'})
        }
    }

}


module.exports = {registerUser,loginUser};


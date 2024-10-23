const express = require('express')
const app = express()
const {pool} = require('./dbConfig')
const bcrypt = require('bcrypt')
const session = require('express-session')
const flash = require('express-flash')
const passport = require('passport')

//Set up de passport
const initializePassport = require('./passportConfig.js')
initializePassport(passport)

const PORT = process.env.PORT || 4000;

//view engine: Usado para renderizar paginas HTML dinámicas
//EJS: Embedded js, template engine. Permite insertar codigo js dentro de html 
app.set('view engine','ejs');

//Middleware que parsea la información del URL-encoded data enviada en el cuerpo de un HTTP request
// extended: false  simple key-values 
app.use(express.urlencoded({extended: false}))

//Middleware para administrar sesiones
app.use(session({
    secret: 'secret', //Sign the session ID cookie
    resave: false, // No guarda sesion a menos que haya sido modificada
    saveUninitialized: false //No crea una sesión a menos que algo haya sido almacenado en ella
}))

//Inicializando passport
app.use(passport.initialize());
app.use(passport.session());

//Middleware para los  flash messages
app.use(flash());

//Los flash messages estarán disponibles en todas las views
app.use((req,res,next)=>{
      res.locals.success_msg = req.flash('success');
  res.locals.error = req.flash('error');
    next();
});


function checkAuthenticated(req,res,next){
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect('/users/login') 
    
}

function checkNotAuthenticated(req,res,next){
    if(req.isAuthenticated()){
        return res.redirect('/users/dashboard')
    }
    next()
}


//Rutas

app.get('/',(req,res)=>{
    res.render("index");
})

app.get('/users/register',checkNotAuthenticated,(req,res)=>{
    res.render("register");
})

app.get('/users/login',checkNotAuthenticated,(req,res)=>{
    res.render("login");
})

app.get('/users/dashboard',checkAuthenticated,(req,res)=>{
    res.render("dashboard",{user: req.user.name})
})

app.get('/users/logout',(req,res,next)=>{
    req.logout((err)=>{
        if(err){ return next(err)}
        res.render("index",{message: "Se ha cerrado sesión exitosamente"});

    });
    
})

app.get('/users/changePassword',checkAuthenticated,(req,res)=>{
    res.render("changePassword");
})


app.post('/users/register',async(req,res)=>{
    let {name,email,password,password2} = req.body;
    console.log({
        name,
        email,
        password,
        password2
    });

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

    if(errors.length>0){
        res.render('register',{errors})
    }else{
        //El registro ha pasado la validación 
        let hashedPassword = await bcrypt.hash(password,10) // El numero determina que tan complejo el proceso de hasheo sera (Salt rounds)
        console.log(hashedPassword)
        
        pool.query(
            `SELECT * FROM users WHERE email =$1`,[email],(err,results)=>{
            if(err){
                throw err
            }
            console.log(results.rows[0])
            
            if(results.rows.length>0){
                errors.push({message: 'Este email ya se encuentra registrado!'})
                res.render('register',{errors})
            }else{
                pool.query(
                    `INSERT INTO users (name,email,password) VALUES ($1,$2,$3) RETURNING id,password`,[name,email,hashedPassword],(err,results)=>{
                        if(err){
                            throw err
                        }
                        console.log(results.rows);
                        req.flash('sucess_msg','Ahora está registrado. Por favor, inicie sesión')
                        res.redirect('/users/login')
                    }
                )               


            }
            
            }
        )
        
    }
})

app.post('/users/changePassword',checkAuthenticated,async(req,res)=>{
    let {currentPassword,newPassword,newPassword2} = req.body;
    let errors = []

    console.log({
        currentPassword,
        newPassword,
        newPassword2
    });

    

    if(!currentPassword || !newPassword || !newPassword2 ){
        errors.push({message: 'Campos incompletos!'})
        console.log('Error')
    }

    if(newPassword.length < 6 ){
        errors.push({message: 'Contraseña débil. Su longitud debe ser mayor a 5'})
        console.log('Error')
    }

    if(newPassword != newPassword2){
        errors.push({message: 'Contraseñas no coinciden'})
        console.log('Error')
    }

    if(errors.length>0){
        return res.render('changePassword',{errors})
    }
    
    try{
        const user = await pool.query('SELECT * FROM users where id=$1',[req.user.id]);

        if(user.rows.length > 0){
            const isMatch = await bcrypt.compare(currentPassword,user.rows[0].password)

            if(!isMatch){
                errors.push({message: 'Contraseña actual incorrecta'});
                return res.render('changePassword',{errors})
            }
            let newhashedPassword = await bcrypt.hash(newPassword,10) 

            await pool.query('UPDATE users SET password=$1 WHERE id=$2',[newhashedPassword,req.user.id])

            req.flash('success_msg','La contraseña se actualizo con exito')
            res.redirect('/users/dashboard')
        }else{
            req.flash('error_msg','Usuario no encontrado')
            res.redirect('/users/login')
        }
  
    }catch(err){
        console.error('Error al cambiar la contraseña',err);
        req.flash('error_msg','Something went wrong')
        res.redirect('/users/changePassword')
    }

})


app.post('/users/login',passport.authenticate('local',{
    successRedirect: '/users/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true,
    successFlash: 'Autenticación correcta'
    

}))

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})
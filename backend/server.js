const express = require('express')
const app = express()
const passport = require('passport')
const flash = require('express-flash')

const userRoutes = require('./routes/userRoutes.js')



//Set up de passport
const initializePassport = require('./config/passportConfig.js')
initializePassport(passport)



const {pool} = require('./config/dbConfig.js')
const bcrypt = require('bcrypt')
const session = require('express-session')


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






//Rutas

//User routes
app.use('/users',userRoutes);
app.get('/faq',(req,res)=>{
    
    

})


app.get('/contact',(req,res)=>{

})


app.get('/questions',(req,res)=>{

})

app.get('/subjects',(req,res)=>{
    
})


app.get('/',(req,res)=>{
    res.render("index");
})





app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})
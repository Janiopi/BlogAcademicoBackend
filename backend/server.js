const express = require('express')
const app = express()
const passport = require('passport')
require('./config/passport/localStrategy.js')(passport)
require('./config/passport/googleStrategy.js')(passport)

const flash = require('express-flash')
const cors = require('cors')


const userRoutes = require('./routes/userRoutes.js')
const questionRoutes = require('./routes/questionRoutes.js')
const answersRoutes = require('./routes/answersRoutes.js')
const commentsRoutes = require('./routes/commentsRoutes.js')
const courseRoutes = require('./routes/courseRoutes.js')
const resourcesRoutes = require('./routes/resourcesRoutes.js')


//Set up de passport


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

//Cross origin  resource sharing
app.use(cors ({
    origin: 'http://localhost:5173',  //React URL
    credentials: true,

}));



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




app.use(express.json());

//Rutas

//User routes
app.use('/users',userRoutes);


//Question routes
app.use('/questions',questionRoutes);

//Answers routes
app.use('/answers',answersRoutes);

//Comments routes
app.use('/comments',commentsRoutes)

//Courses routes
app.use('/courses',courseRoutes)

//Resource routes
app.use('/resources',resourcesRoutes);

app.get('/',(req,res)=>{
    res.render("index");
})





app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})
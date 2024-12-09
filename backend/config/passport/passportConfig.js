//Passport: middleware para user authentication

const LocalStrategy = require("passport-local").Strategy; //Como el usuario sera autenticado
const GoogleStrategy = require('passport-google-oauth20').Strategy

const {pool} = require('../dbConfig'); //Util para realizar queries
const bcrypt = require("bcrypt"); // Util para hashear contraseñas,etc

require("dotenv").config(); //Variables de entorno

//Local authentication
const authenticateLocalUser = async (email,password,done) =>{
    try{
        //Query: Seleccionar usuarios por email
        const {rows} = await pool.query(`SELECT * FROM users WHERE email = $1`,[email]); //Esperará al resultado de la query antes de proceder
        if(rows.length > 0){
            const user = rows[0];
        
            //Compara la contraseña con la contraseña hasheada dentro de la base de datos
            const isMatch = await bcrypt.compare(password,user.password);

            if(isMatch){
                return done(null,user)
            }else{
                return done(null,false,{message:"Contraseña incorrecta"});
            }
        }else{
            return done(null,false,{message:"Email no registrado"});
        }
    }catch(err){
        console.error("Error in local authentication", err);
        return done(err);
    }
}
passport.use('local',new LocalStrategy({usernameField:"email",passwordField:"password"},authenticateLocalUser));


//Google authentication
const authenticateGoogleUser = async (accessToken,refreshToken,profile,done)=>{
    try{
        console.log('Google Profile:',profile);

        const {rows} = await pool.query(
            'SELECT * FROM users WHERE google_id = $1 OR email = $2',
            [profile.id,profile.emails[0].value]

        )

        let user = rows[0]

        if(!user){
            const result = await pool.query(
                'INSERT INTO users (name,email,google_id,provider) VALUES ($1,$2,$3,$4) RETURNING *',
                [
                    profile.displayName,
                    profile.emails[0].value,
                    profile.id,
                    'google',
                ]

            );
            user = result.rows[0];
        }
        return done(null,user);

    }catch(err){
        console.error('Error during Google Authentication:',err)
        return done(err,false);
    }   


}


passport.use('google', new GoogleStrategy({
    clientID:process.env.GOOGLE_CLIENT_ID,
    clientSecret:process.env.GOOGLE_CLIENT_SECRET,
    callbackURL:""},
    (accessToken,refreshToken,profile,done)=>{
        return done(null,profile);
    },
    authenticateGoogleUser
    )
);

/*
//Inicializa Passport 
function initialize(passport){
        


    //Serializa al usuario y lo almacena en la sesion
    //El usuario ahora sera representado por un id
    passport.serializeUser((user,done) => done(null,user.id));
    
    //Deserializa al usuario de la sesion
    passport.deserializeUser(async(id,done)=>{
        try{
            const {rows} = await pool.query(`SELECT * FROM users where id = $1`,[id]);
            if(rows.length>0){
                return done(null,rows[0]);
            }else{
                return done(new Error("Usuario no encontrado"),null);
            }
        }catch(err){
            console.error("Error al deserializar: ",err);
            return done(err);
        }
    });
};

module.exports = initialize;
*/
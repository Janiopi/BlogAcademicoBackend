//Passport: middleware para user authentication

const GoogleStrategy = require('passport-google-oauth20').Strategy
const passport = require('passport')

const {pool} = require('../dbConfig'); //Util para realizar queries

require("dotenv").config(); //Variables de entorno


module.exports = function(passport){
    passport.use('google', 
    new GoogleStrategy(
        {
        clientID:process.env.GOOGLE_CLIENT_ID,
        clientSecret:process.env.GOOGLE_CLIENT_SECRET,
        callbackURL:`${process.env.BASE_URL}/users/authGoogle/callback`,
        },
        async (accessToken,refreshToken,profile,done)=>{
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
    
        )
    );


}

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




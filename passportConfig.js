//Passport: middleware para user authentication

const LocalStrategy = require("passport-local").Strategy; //Como el usuario sera autenticado
const {pool} = require('./dbConfig'); //Util para realizar queries
const bcrypt = require("bcrypt"); // Util para hashear contraseñas,etc


//Inicializa Passport 
function initialize(passport){
    const authenticateUser = async (email,password,done) =>{
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
            console.error("Error autenticando al usuario:", err);
            return done(err);
        }
    };

    passport.use(new LocalStrategy({usernameField:"email",passwordField:"password"},authenticateUser));

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

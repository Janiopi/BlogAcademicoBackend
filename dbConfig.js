require("dotenv").config(); //Variables de entorno

const{Pool} = require("pg");   // Coleccion de conexiones reusables

const isProduction = process.env.NODE_ENV === "production"; //True si el modo producción esta activado

const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:
${process.env.DB_PORT}/${process.env.DB_DATABASE}`; //Conexión local a la base de datos

const pool = new Pool({
    connectionString: isProduction ? process.env.DATABASE_URL : connectionString      //Production mode usará DATABASE_URL
});                                                                                   //Dev mode usará connectionString

module.exports = {pool}

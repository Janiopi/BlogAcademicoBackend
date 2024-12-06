 // Los modelos son responsables de interactuar con la DB

 const {pool} = require('../config/dbConfig.js') 


 //Create
 const uploadPDF = async ({courseId,filePath,title})=>{
    type = 'pdf'
    const result = await pool.query(
        'INSERT INTO resources (course_id,url,type,title) VALUES ($1,$2,$3,$4) RETURNING *',
        [courseId,filePath,type,title]
    );
    return result.rows[0];

 }


 const uploadVideo = async({courseId,videoId,title})=>{
    type='video'
    const result = await pool.query(

        'INSERT INTO resources (course_id,url,type,title) VALUES ($1,$2,$3,$4) RETURNING *',
        [courseId,videoId,type,title]
    )
    return result.rows[0];
 }


 //Read
 const retrievePDF = async({id}) =>{
    const result = await pool.query(
        'SELECT url FROM resources WHERE id = $1',
        [id]

    );
    return result.rows[0];

}


const retrieveVideo = async({id})=>{
    type='video'
    const result = await pool.query(
        'SELECT url FROM resources WHERE id = $1',
        [id]
        );
    return result.rows[0];
 }

 module.exports = {uploadPDF,retrievePDF,uploadVideo,retrieveVideo}
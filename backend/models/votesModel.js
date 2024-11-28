 // Los modelos son responsables de interactuar con la DB

 const {pool} = require('../config/dbConfig.js') 

const vote = async({id,user_id,vote_type})=>{
    try {
        
        await pool.query(
            'INSERT INTO votes (user_id, answer_id, vote_type) VALUES ($1, $2, $3) ON CONFLICT (user_id, answer_id) DO UPDATE SET vote_type = EXCLUDED.vote_type',
            [user_id, id, vote_type]
        );

        res.send('Vote recorded');
    } catch (err) {
        console.error(err.message);
        
    }


}

module.exports = {vote}



 





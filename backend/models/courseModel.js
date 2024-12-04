// Los modelos son responsables de interactuar con la DB

const {pool} = require('../config/dbConfig.js')

//Create

const newCourse = async ({ name, teacher, tags, description }) => {
  const result = await pool.query(
    'INSERT INTO courses (name, teacher,  tags, description) VALUES ($1, $2, $3, $4) RETURNING *',
    [name, teacher, JSON.stringify(tags), description]
  );
  return result.rows[0]; 
};

//Read

const findCourseById= async(id)=>{
    
    const result = await pool.query('SELECT * FROM courses where id = $1',[id]);
    return result.rows[0];
}


//Update

const updateCourseName = async ({id,newName})=>{
    const result = await pool.query(
      'UPDATE courses SET name = $2 WHERE id=$1',
      [id,newName]
    )
    return result.rows[0]; 
};

const updateCourseTeacher = async ({id,newTeacher})=>{
    const result = await pool.query(
      'UPDATE courses SET teacher = $2 WHERE id=$1',
      [id,newTeacher]
    )
    return result.rows[0]; 
};


const updateCourseTags = async ({ id, newTags }) => {
    const result = await pool.query(
      'UPDATE courses SET tags = $2 WHERE id = $1 RETURNING *', 
      [id, newTags]
    );
     return result.rows[0];
  };
  

const updateCourseDesc = async ({id,newDesc})=>{
    const result = await pool.query(
        'UPDATE courses SET description = $2 WHERE id=$1',
        [id,newDesc] 
    )
    return result.rows[0];
}



//Delete

const deleteCourseById = async ({ id }) => {
  const result = await pool.query(
    'DELETE FROM courses WHERE id = $1',[id]);
  return result.rows[0]; 
};



module.exports = {
    newCourse,
    findCourseById,
    updateCourseDesc,
    updateCourseName,
    updateCourseTags,
    updateCourseTeacher,
    deleteCourseById,
  
};
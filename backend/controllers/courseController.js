// Los controladores se encargan de manejar las solicitudes HTTP
const {   newCourse,findCourseById, updateCourseDesc, updateCourseName, updateCourseTags,updateCourseTeacher, deleteCourseById}
= require('../models/courseModel.js')


//Create
const createNewCourse = async(req,res)=>{
    try{
        const{ name, teacher, tags, description} = req.body;
        console.log(req.body)

        if( !name||!teacher||!tags||!description){
            return res.status(400).json({error: 'Missing fields'});

        }


        const result = await newCourse({name, teacher, tags, description});
        res.status(201).json(result)
    }catch(err){
        console.error(err.message)
        res.status(500).send('Server error')
    }
}

//Read
const findCourse = async (req, res) => {
    const { id } = req.params;
        
    if (!id) {
      return res.status(400).json({ error: 'Invalid course ID' });
    }
  
    try {
      
      const answers = await findCourseById(id);
      res.status(200).json({ answers });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
};

//Update

const updateName = async (req,res) =>{
    const {id,newName} = req.body;

    if(!id||!newName){
        return res.status(400).json({error:'Invalid course ID'});
    }
    try{
        const result = await updateCourseName({id,newName});
        res.status(201).json(result);
    }catch{
        console.error(err.message)
        res.status(500).send('Server error')
    }

}
const updateTeacher = async (req,res) =>{
    const {id,newTeacher} = req.body;

    if(!id||!newTeacher){
        return res.status(400).json({error:'Invalid course ID'});
    }
    try{
        const result = await updateCourseTeacher({id,newTeacher});
        res.status(201).json(result);
    }catch{
        console.error(err.message)
        res.status(500).send('Server error')
    }

}
const updateTags = async (req, res) => {
    const { id, newTags } = req.body;
  
    // Validate inputs
    if (!id || !newTags) {
      return res.status(400).json({ error: 'Invalid course ID or tags' });
    }
  
    try {
      // Update course tags
      const result = await updateCourseTags({ id, newTags: JSON.stringify(newTags) });
  
      // If no row is updated, return a 404 error
      if (!result) {
        return res.status(404).json({ error: 'Course not found' });
      }
  
      // Return 200 OK with updated course data
      res.status(200).json(result);  // Return the updated course details
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  };
  


const updateDesc = async (req,res) =>{
    const {id,newDesc} = req.body;

    if(!id||!newDesc){
        return res.status(400).json({error:'Invalid course ID'});
    }
    try{
        const result = await updateCourseDesc({id,newDesc});
        res.status(201).json(result);
    }catch{
        console.error(err.message)
        res.status(500).send('Server error')
    }

}


//Delete
const deleteCourse = async(req,res)=>{
    try{
        const {id} = req.body;
        if(!id){
            return res.status(400).json({error:'Missing required fields'});
        }
        const result = await deleteCourseById({id});
        res.status(204).json(result);

    }catch(err){
        console.error(err.message)
        res.status(500).send('Server error')
    }
}

module.exports = {createNewCourse,findCourse,updateName,updateTags,updateTeacher,updateDesc,deleteCourse};





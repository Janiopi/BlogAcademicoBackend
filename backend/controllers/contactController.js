// Los controladores se encargan de manejar las solicitudes HTTP
const { newContact,findContactAll,findContactById  }
= require('../models/contactModel')


//Create
const createNewContact = async(req,res)=>{
    try{
        const{email,asunto,mensaje} = req.body;
        console.log(req.body)
        if( !email||!mensaje){
            return res.status(400).json({error: 'Missing fields'});

        }
        const result = await newContact({email,asunto,mensaje})
        res.status(201).json(result)
    }catch(err){
        console.error(err.message)
        res.status(500).send('Server error')
    }
}

//Read
const findContact = async (req, res) => {
    const { id } = req.params;
        
    if (!id) {
      return res.status(400).json({ error: 'Invalid  ID' });
    }
  
    try {
      
      const answers = await findContactById(id);
      res.status(200).json({ answers });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
};

const findAllContact = async (req, res) => {
     
 
    try {
      
      const answers = await findContactAll();
      res.status(200).json({ answers });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
};



//Update


//Delete

module.exports = {createNewContact,findContact,findAllContact};





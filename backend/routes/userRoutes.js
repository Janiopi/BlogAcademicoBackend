const express = require('express');
const router = express.Router();
const {registerUser,loginUser} = require('../controllers/userController.js')
const {checkAuthenticated,checkNotAuthenticated} = require('../middleware/authMiddleware.js')


router.get('/register',checkNotAuthenticated,(req,res)=>res.render('register'));
router.post('/register',registerUser)

router.get('/login',checkNotAuthenticated,(req,res)=>res.render('login'));
router.post('/login',loginUser);

router.get('/dashboard', checkAuthenticated, (req, res) => {
    if (req.user && req.user.name) {
      return res.json({ name: req.user.name });
    } else {
      return res.status(400).json({ error: 'User is not authenticated or name is missing' });
    }
  });
  

router.get('/logout',(req,res,next)=>{
    req.logout((err)=>{
        if(err) return next(err);
        res.render('index',{message: 'Sesión cerrada exitosamente'});



    })

})

router.get('/changePassword',checkAuthenticated,(req,res)=>{
    res.render("changePassword");
})


module.exports = router;
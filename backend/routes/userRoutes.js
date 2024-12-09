const express = require('express');
const router = express.Router();
const passport = require('passport')
const {registerUser,loginUser} = require('../controllers/userController.js')
const {checkAuthenticated,checkNotAuthenticated} = require('../middleware/authMiddleware.js')


router.get('/register',checkNotAuthenticated,(req,res)=>res.render('register'));
router.post('/register',registerUser)

router.get('/login',checkNotAuthenticated,(req,res)=>res.render('login'));
router.post('/login',loginUser);

router.get('/dashboard', checkAuthenticated, (req, res) => {
  
  res.render('dashboard',{user:req.user.name});
 
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


router.get('/authGoogle',passport.authenticate('google',{scope:['profile','email']}));

router.get(
  '/authGoogle/callback',
  passport.authenticate('google',{failureRedirect: '/login'}),
  (req,res)=>{
    console.log(req.user)
    res.render('dashboard',{user:req.user.name});
  }

);


module.exports = router;
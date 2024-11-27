
function checkAuthenticated(req,res,next){
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect('/users/login') 
    
}

function checkNotAuthenticated(req,res,next){
    if(req.isAuthenticated()){
        return res.redirect('/users/dashboard')
    }
    next()
}

module.exports = {checkAuthenticated,checkNotAuthenticated}
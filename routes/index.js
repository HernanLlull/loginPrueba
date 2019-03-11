var express = require('express');
var router = express.Router();

/** .isAuthenticated es un metodo de passport */
var loggedin = function(req,res,next){
  if(req.isAuthenticated()){
    next();
  }
  else{
    res.redirect('/login');
  }
}



/* GET home page. */

//Ruta inicial
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

//Ruta de login
router.get('/login',(req,res,next)=>{
  res.render('login');
});

//Ruta de registro
router.get('/signup',(req,res,next)=>{
  res.render('signup',{err:''});
});

//Ruta de perfil
router.get('/profile',loggedin,(req,res,next)=>{
  res.render('profile');
});

//Ruta para cerrar la sesion
router.get('/logout',function(req,res,next){
  req.logOut();
  res.redirect('/');
});

module.exports = router;

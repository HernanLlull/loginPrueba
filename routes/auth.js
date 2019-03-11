var express = require('express');
var router = express.Router();
var db = require('better-sqlite3')('database.db');
var bcrypt = require('bcrypt-nodejs');

/* GET home page. */

module.exports = function(passport){
    //Peticion post para registrarse
    router.post('/signup', function(req, res) {
        var body = req.body,
            username = body.username,
            password = body.password;//Con body-parser simplifica la peticion post del formulario
        
        //Recupero de la base de datos el usuario que tenga el mismo nombre que la peticion       
        var user = db.prepare("SELECT * FROM usuarios WHERE name=?").get(username);

        if(user){
            res.render('signup',{err:'El usuario ya existe elija otro'});
        }
        else{
            password=bcrypt.hashSync(password,bcrypt.genSaltSync(10));
            db.prepare("INSERT INTO usuarios(name,password) VALUES(@username,@password)").
            run({
                username:username,
                password:password
            });
            var user = db.prepare("SELECT * FROM usuarios WHERE name=@name AND password=@password").
            get({
                name:username,
                password:password
            });
            res.send(user);
        }       
      });

    router.post('/login',passport.authenticate('local',{
        failureRedirect:'/login',
        successRedirect:'/profile'
    }),function(req,res){
        res.send('hey');
    });
    return router;
};

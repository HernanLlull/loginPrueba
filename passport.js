var localStrategy = require('passport-local').Strategy;
var db = require('better-sqlite3')('database.db');
var bcrypt = require('bcrypt-nodejs');
module.exports = function(passport){
   
    passport.serializeUser(function(user,done){
        done(null,user);
    });
    passport.deserializeUser(function(user,done){
        done(null,user);
    });

    passport.use(new localStrategy(function(username,password,done){
        var user = db.prepare("SELECT * FROM usuarios WHERE name=?").get(username);
        if(user){
            var bool = bcrypt.compareSync(password,user.password);
            if(bool){
                done(null,{
                    username:user.name,
                    password:user.password
                });
    
            }
        }
    }));

}
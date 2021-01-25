const express = require('express');
const router = express.Router();
const User = require("../models/user");
const bcrypt = require('bcrypt');
const passport = require('passport');
router.get('/login',(req,res)=>{
    res.render('login');
})
router.get('/register',(req,res)=>{
    res.render('register')
    })
router.post('/login',(req,res,next)=>{
passport.authenticate('local',{
    successRedirect : '/dashboard',
    failureRedirect: '/users/login',
    failureFlash : true
})(req,res,next)
})
router.post('/register',(req,res)=>{
    const {name,email, password, password2} = req.body;
    let errors = [];
    console.log(' name ' + name+ ' email :' + email+ ' pass:' + password);
    if(!name || !email || !password || !password2) {
        errors.push({msg : "please fill out all information"})
    }
    if(password !== password2) {
        errors.push({msg : "passwords dont match"});
    }
    if(password.length < 8 ) {
        errors.push({msg : 'password must be at least 8 characters'})
    }
    if(errors.length > 0 ) {
    res.render('register', {
        errors : errors,
        name : name,
        email : email,
        password : password,
        password2 : password2})
     } else {
       User.findOne({email : email}).exec((err,user)=>{
        console.log(user);   
        if(user) {
            errors.push({msg: 'email associated with an existing account'});
            res.render('sign up',{errors,name,email,password,password2})  
           } else {
            const newUser = new User({
                name : name,
                email : email,
                password : password
            });
            bcrypt.genSalt(10,(err,salt)=> 
            bcrypt.hash(newUser.password,salt,
                (err,hash)=> {
                    if(err) throw err;
                        newUser.password = hash;
                    newUser.save()
                    .then((value)=>{
                        console.log(value)
                        req.flash('success_msg','you have successfully signed up!');
                        res.redirect('/users/login');
                    })
                    .catch(value=> console.log(value));
                }));
             }
       })
    }
})
router.get('/logout',(req,res)=>{
req.logout();
req.flash('success_msg','logged out... see you soon!');
res.redirect('/users/login'); 
})
module.exports  = router;
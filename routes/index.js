const express = require('express');
const router  = express.Router();
const {ensureAuthenticated} = require('../config/auth') 
router.get('/', (req,res)=>{
    res.render('welcome');
})
router.get('/register', (req,res)=>{
    res.render('register');
})
router.get('/profile',ensureAuthenticated,(req,res)=>{
    res.render('profile',{
        user: req.user
    });
})
module.exports = router; 
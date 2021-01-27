const express = require('express');
const router  = express.Router();
const {ensureAuthenticated} = require('../config/auth') 

router.get('/', (req,res)=>{
    res.render('welcome');
})
router.get('/register', (req,res)=>{
    res.render('register');
})
router.get('/dashboard',ensureAuthenticated,(req,res)=>{
    res.render('dashboard',{
        user: req.user
    });
})
router.get('/index', ensureAuthenticated, (req,res)=>{
    res.render('index', {
        user: req.user
    });
})

module.exports = router; 
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const app = express();
const expressEjsLayout = require('express-ejs-layouts')
const flash = require('connect-flash');
const session = require('express-session');
const passport = require("passport");
const dotenv = require('dotenv').config();
const multer = require('multer');
const path = require('path');
const fileUpload = require('express-fileupload')

require('./config/passport')(passport)

mongoose.connect('mongodb://localhost/test',{useNewUrlParser: true, useUnifiedTopology : true})
.then(() => console.log('[ welcome to my app :))) ]'))
.catch((err)=> console.log(err));


app.set('view engine','ejs');
app.use(expressEjsLayout);

app.use(express.urlencoded({extended : false}));

app.use(session({
    secret : 'secret',
    resave : true,
    saveUninitialized : true
}));


app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use('/',require('./routes/index'));
app.use('/users',require('./routes/users'));
app.use(express.static(__dirname + '/public'));

app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
}));

app.listen(3000); 

module.exports = app;

const PORT = process.env.PORT || 8000; app.listen(PORT, () => { console.log(`Success! Connected! Run ${PORT} OR ${3000} from host cpu to open!`); });
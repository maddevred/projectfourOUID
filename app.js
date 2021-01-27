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
const fileUpload = require('express-fileupload');
const {MongoClient} = require('mongodb');

const isLoggedIn = require('./middleware/isLoggedIn');

require('./config/passport')(passport)

mongoose.connect('mongodb://localhost/test',{useNewUrlParser: true, useUnifiedTopology : true})
.then(() => console.log('[ welcome to my app :))) ]'))
.catch((err)=> console.log(err));

async function main(){
    const uri = "mongodb+srv://root:null@firstcluster.1bziy.mongodb.net/test?retryWrites=true&w=majority";
    const client = new MongoClient(uri);
}

main().catch(console.error);

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

app.get('/',isLoggedIn, function(req, res) {
    if (req.user) {
    axios.get('https://www.themealdb.com/api/json/v1/1/random.php')
      .then(function (response) {
        console.log(JSON.stringify(response.data.meals[0]));
        res.render("recipes", {
          recipe: response.data.meals[0]
        })
        console.log(typeof response.data);
      })
    }  
    else res.render('index', { alerts: res.locals.alerts });
});

app.get('/dashboard', isLoggedIn, (req, res) => {
    res.render('dashboard');
  });

app.listen(3000); 

module.exports = app;

const PORT = process.env.PORT || 8000; app.listen(PORT, () => { console.log(`Success! Connected! Run ${PORT} OR ${3000} from host cpu to open!`); });



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

require('./config/passport')(passport)

mongoose.connect('mongodb://localhost/test',{useNewUrlParser: true, useUnifiedTopology : true})
.then(() => console.log('[ welcome to my app :))) ]'))
.catch((err)=> console.log(err));

// async function main(){
//     const uri = "mongodb+srv://root:null@firstcluster.1bziy.mongodb.net/test?retryWrites=true&w=majority";
//     const client = new MongoClient(uri);

//     try {
//         await client.connect();

//         await  listDatabases(client);

//     } catch (e) {
//         console.error(e);
//     } finally {
//         await client.close();
//     }
// }

// async function listDatabases(client){
//     databasesList = await client.db().admin().listDatabases();
//     console.log("Databases:");
//     databasesList.databases.forEach(db => console.log(` - ${db.name}`));
// };

// main().catch(console.error);

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



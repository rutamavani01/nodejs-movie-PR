const express = require('express');
const port = 8000;
const app = express();
app.set('view engine','ejs');
app.use(express.urlencoded());
const path = require('path');

const db = require('./config/db');
const movieTbl = require('./models/movieTbl');

app.use('/',require('./routes/indexRoutes'));
app.use('/uploads',express.static(path.join(__dirname, 'uploads')));

//bootstrap link
app.use('/bootstrap', express.static(path.join(__dirname, 'node_modules/bootstrap/dist')));

app.listen(port,(err)=>{
    if(err){
        console.log(err);
        return false;
    }
    console.log(`server is start on port ${port}`);;
})
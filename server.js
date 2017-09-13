const bodyParser = require('body-parser');

const _ = require("lodash");
const express = require('express');
const app = express();
const path = require('path')
const logger = require('morgan');
const user  = require('./routes/auth.js');
const mongoose = require('mongoose');
const jwtVerify = require('./jwt/jwt-verifier');

// Adding the attributes for the user

app.use((req, res, next) =>{
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,x-token-validation');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});


// ==== Views
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(express.static(path.join(__dirname,'/dist')));


mongoose.connect('mongodb://localhost/data',{
  useMongoClient: true,
  /* other options  ====>>> Read About */
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// >>>> Delete after full developing LOGGER
app.use(logger('dev'));

app.use('/auth/user',user);


app.get("/verify",jwtVerify.verify,(req,res)=>{
  res.send({'success':true, message:'Login Valid'});
});


// Used to make router in Angular2 and Redirect to non existent pages
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});



app.listen(3000,(req,res) =>
{
  console.log('Server Working');
});

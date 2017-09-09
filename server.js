const bodyParser = require('body-parser');

const _ = require("lodash");
const express = require('express');
const app = express();
const path = require('path')
const logger = require('morgan');
const user  = require('./routes/auth.js');
const mongoose = require('mongoose');

// Adding the attributes for the user

app.use((req, res, next) =>{
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,x-access-token');
res.setHeader('Access-Control-Allow-Credentials', true);
next();
});


// ==== Views
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);


mongoose.connect('mongodb://localhost/data',{
  useMongoClient: true,
  /* other options */
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// >>>> Delete after full developing LOGGER

app.use(logger('dev'));

app.use('/auth/user',user);

// >>>> Dummy users
const users = [
  {
    id: '1',
    name: 'lfpll',
    password: 'luiz'
  }]





// Used to make router in Angular2 and Redirect to non existent pages
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.get("/verify",(req,res)=>{

})

// == LOGIN ROUTE ==
// To implement
// 1 - Encryption of the password
// 2 - Connection to mongoose
// 3 - Better error messages and Welcome messages

app.listen(3000,(req,res) =>
{
  console.log('Server Working')
})

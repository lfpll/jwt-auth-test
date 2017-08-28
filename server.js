const passportJwt = require('passport-jwt');
const passport = require("passport");
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const _ = require("lodash");
const express = require('express');
const app = express();
const path = require('path')
var logger = require('morgan');
var ExtractJwt = passportJwt.ExtractJwt;
var JwtStrategy = passportJwt.Strategy;

//Changing the dir to where angualr is

app.use(express.static((__dirname, 'dist')));


//Views
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//LOGGER

app.use(logger('dev'));

//Dummy users
const users = [
  {
    id: '1',
    name: 'lfpll',
    password: 'luiz'
  }]


//Starting of JWT Strategy
let jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'testatesstando';

//Defines the strategy used by jwt
var strategy = new JwtStrategy(jwtOptions,(payload,next) =>
{
  const user = users[_.findIndex(users,{id:payload.id})];

  if(user){
    next(null,user)
  }
  else{
    next(null,false)
  }
});

passport.use(strategy);


app.use(passport.initialize());



// 1- To decide what is the beggining
app.get('/',(req,res) =>
{
  res.render('index.html')
});


// == LOGIN ROUTE ==
// To implement
// 1 - Encryption of the password
// 2 - Connection to mongoose
// 3 - Better error messages and Welcome messages

app.post('/auth',(req,res)=>
  {
    console.log(req.body)
    const user = users[_.findIndex(users, {name: req.body.name})]
    if(!user)
    {
      res.json({message:"No user Found"})
    }
    else if(user.password === req.body.password)
    {
      //PayLoad to be Encrypted (?) - xxxx.yyyy.zzz Payload = xxxx
      const payLoad = {id: user.id}
      res.json({message:"Welcome" ,token:(jwt.sign(payLoad,jwtOptions.secretOrKey))});
    }
    else
    {
      res.json({message:"Wrong Password"})
    }
  }
);

app.get('/auth',passport.authenticate('jwt',{session:false}),(req,res)=>
{
  console.log('working');
  //Angular logic, if (null) logout, if (true) nothing happen
  res.json({value:true});
})

app.listen(3000,(req,res) =>
{
  console.log('Server Working')
})

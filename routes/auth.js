const mongoose = require('mongoose');
const User     = require('../models/user');
const express  = require('express')
const router   = express();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');


// ==== LOGIN ROUTE

router.post('/login',(req,res)=>{
  const logUser = req.body
  User.findOne({email:logUser.email},(err,user)=>
  {
    //Apparently if I don'tu se return mongoose keeps running
    // >>>> Check if return is needed
    //
    if(err)
    {
      return done(err);
    }

    if(!user)
    {
      res.send({success: false, message:'User does not exist'});
      return;
    }

    if(!user.validPassword(logUser.password))
    {
      res.send({success: false, message:'Password is not valid'});
      return;
    }

    //If it pass al the validations it send's a token with 24 hour as validation
    res.send({success:true, message:'You are Logged In', token:jwt.sign(user,'yourSecret',{expiresIn:60*60*24})});
  })
})

// ==== REGISTER ROUTE

router.post('/register',(req,res) =>{
  let userData = req.body
  User.findOne({'email':userData.email},(err,user)=>
    {
      //Apparently if I don't use return mongoose keeps running
      // >>>> Check if return is needed
      if(err) return done(err);

      //If the user don't exist on the database
      if(user)
      {
        res.send({success: false, message:'User already exists'});
        return;
      }

      let newUser = new User();
      newUser.email = userData.email;
      newUser.password = newUser.generateHash(userData.password);
      newUser.save((err)=>
      {
        //Stop section if there is an error
        if(err) {
          throw err
        }
        else
        {
          // If it's successfull it send's a token for the front End
          const token = jwt.sign({
            newUser
          }, 'yoursecret', { expiresIn: 60 * 60 *24 });
          res.send({success:true,message:'User logged in', token:token})
        }
      });
    });
});

module.exports = router;

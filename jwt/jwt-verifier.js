var jwt = require('jsonwebtoken');

module.exports ={

    // Using the node verify pattern (request,response,next)
  verify:((req,res,next) =>
  {
      const token = req.body.token || req.query.token || req.headers['x-token-validation'];

      if(token)
      {
        jwt.verify(token,'yourSecret',(err,dec)=>
        {
        if(err) return res.json({success:false,message:'Token Invalid'});
        else
        {
          next();
        }
        })
      }
      else
      {
        res.send({success:false,message:"There is no token"})
      }
  })
}


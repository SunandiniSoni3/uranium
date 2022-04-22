const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");


const mid1= function(req,res,next){

    let token = req.headers["x-Auth-token"];
 if (!token) token = req.headers["x-auth-token"];

  //If no token is present in the request header return error
  if (!token) return res.send({ status: false, msg: "token must be present" });
  
  
  let decodedToken = jwt.verify(token, "functionup-Uranium");
  if (!decodedToken)
    return res.send({ status: false, msg: "token is invalid" })

  let userToBeModified=req.params.userId
   let userLoggedIn=decodedToken.userId
   if(userToBeModified != userLoggedIn){
     return res.send({satus:false,msg:"User is not the logged in user"})
   }
   
  
  next() 

}

module.exports.mid1=mid1
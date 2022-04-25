const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");


const mid1= function(req,res,next){
try{
      let token = req.headers["x-Auth-token"];
  if (!token) token = req.headers["x-auth-token"];

    
    if (!token) return res.status(401      ).send({ status: false, msg: "token must be present" });
    
    
    let decodedToken = jwt.verify(token, "functionup-Uranium");
    if (!decodedToken)
      return res.status(401).send({ status: false, msg: "token is invalid" })

    let userToBeModified=req.params.userId
    let userLoggedIn=decodedToken.userId
    
    if(userToBeModified != userLoggedIn){
      return res.status(404).send({satus:false,msg:"User is not the logged in user"})
    }
    
    next() 
  }
  catch(err){
    console.log(err.message)
    res.status(500).send({status:"error",msg:err.message})

  }
}

const mid2 = async function(req,res,next){
  try{
    let userId = req.params.userId;
    // if(!userId){
    //   return res.status(400).send({msg:"UserId can not be empty"})
    // }
    
    let userDetails = await userModel.findById(userId);
    if (!userDetails)
      return res.status(404).send({ status: false, msg: "No such user exists" });
    next()
  }
  catch(err){
    console.log(err.message)
    res.status(500).send({status:"error",msg:err.message})
  }
}

module.exports.mid1=mid1
module.exports.mid2=mid2
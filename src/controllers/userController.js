const res = require("express/lib/response");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const createUser = async function (req,res) {
  try{
    let data =req.body
    if (Object.keys(data).length===0){
      return res.status(400).send({msg:"fields are empty"})
    }
    let savedData = await userModel.create(data)
    res.status(201).send({ msg: savedData });
  }
  catch(err){
    console.log(err.message)
    res.status(500).send({status:"error",msg:err.message})
  }
};


const loginUser = async function (req, res) {
  try{
    let userName = req.body.emailId;
    let password = req.body.password;
    if(!(userName&&password)){
      return res.status(400).send({msg:"emailid and passward can not be empty"})
    }
    let user = await userModel.findOne({ emailId: userName, password: password });
    if (!user)
      return res.ststus(404).send({status: false, msg: "username or the password is not corerct"});
 
    let token = jwt.sign(
      {
        userId: user._id.toString(),
        batch: "Uranium",
        organisation: "FunctionUp",
      },
      "functionup-Uranium"
    );
    res.setHeader("x-auth-token", token);
    res.status(200).send({ status: true, data: token });
  }
  catch(err){
    console.log(err.message)
     res.status(500).send({status:"error",msg:err.message})
  }
}




const getUserData = async function (req, res) {
  try{
    let userId = req.params.userId;
    let userDetails = await userModel.findById(userId);
    res.status(200).send({ status: true, data: userDetails })
  }
  catch(err){
    console.log(err.message)
    res.status(500).send({status:"error",msg:err.message})
  }
};

const updateUser = async function (req, res) {

  try{
    let userId = req.params.userId;
    

    let userData = req.body;
    let updatedUser = await userModel.findOneAndUpdate({ _id: userId }, userData,{new:true});
    res.status(200).send({ status: true , data: updatedUser });
  }
  catch(err){
    console.log(err.message)
    res.status(500).send({status:"error",msg:err.message})
  }

};

const deleteUser= async function(req,res){
 
  try{
    let userId = req.params.userId;
    let deletedUser = await userModel.findOneAndUpdate({ _id: userId }, {$set:{isDeleted:true}},{new:true});
    res.status(200).send({ status: true , data: deletedUser });
  }
  catch(err){
    console.log(err.message)
    res.status(500).send({status:error,msg:err.message})
  }
}


module.exports.createUser = createUser;
module.exports.getUserData = getUserData;
module.exports.updateUser = updateUser;
module.exports.loginUser = loginUser;
module.exports.deleteUser=deleteUser
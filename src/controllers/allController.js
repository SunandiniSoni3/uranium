const UserDocumentModel= require("../models/userDocumentModel")
const productModel= require("../models/productModel")
const OrderModel= require("../models/orderModel")
const userDocumentModel = require("../models/userDocumentModel")
const orderModel = require("../models/orderModel")

const createUser = async function(req,res){
    let data = req.body
    let user = await UserDocumentModel.create(data)
    res.send({msg:user})

}

const createProduct = async function(req,res){
    let data =req.body
    let product = await productModel.create(data)
    res.send({msg:product})
}

const createOrder = async function(req,res){
    try{
        let data = req.body
        let  user = await UserDocumentModel.findById(data.userId)
        let product = await productModel.findById(data.productId)
        if(!user){
            res.send("userId is not valid.")
        }
        else if(!product){
            res.send("productId is not valid.")
        }
        
     
        let header = req.headers["isfreeappuser"]||req.headers["isFreeAppUser"]
        if(header==="false"){
            console.log(product);
            let uB =user.balance
            let pP=product.price
            let y = uB >= pP
            if(!y) return res.send({msg:"user dosen't have required balance"});
            let balance = await userDocumentModel.findByIdAndUpdate(data.userId,{$set:{balance:uB-pP}},{new:true})
            
            req.body.amount = product.price
            req.body.isFreeAppUser= false
            let order = await OrderModel.create(req.body)
            res.send({data:order})
        }
        if(header==="true"){
            req.body.amount=0
            req.body.isFreeAppUser=true
            let order =await OrderModel.create(req.body)
            res.send({data:order})
        }
            
            
            // let order = await OrderModel.create(data)
            
        
    }
    catch(err){
        console.log(err.message)
        res.status(500).send({status:"server error",error:err.message})
    }


}
module.exports.createUser =createUser
module.exports.createProduct=createProduct
module.exports.createOrder = createOrder

const UserDocumentModel= require("../models/userDocumentModel")
const productModel= require("../models/productModel")
const OrderModel= require("../models/orderModel")

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
     let data = req.body
    let  user = await UserDocumentModel.findById(data.userId)
    let product = await productModel.findById(data.productId)
    if(!user){
        res.send("userId is not valid.")
    }
    else if(!product){
        res.send("productId is not valid.")
    }
    else{
        let order = await OrderModel.create(data)
        let header = req.headers.isfreeappuser
        console.log(header)
        if(header)
           
            
            res.send({msg: orderChange})
        
        // let order = await OrderModel.create(data)
        
    }

}
module.exports.createUser =createUser
module.exports.createProduct=createProduct
module.exports.createOrder = createOrder

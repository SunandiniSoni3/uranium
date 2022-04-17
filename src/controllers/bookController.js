const authorModel = require("../models/authorModel")
const bookModel= require("../models/bookModel")
const publisherModel =require("../models/publisherModel")


const createAuthor = async function(req,res){
    let data = req.body
    const authorData= await authorModel.create(data)
    res.send({msg: authorData})
}

const createPublisher =async function(req,res){
    let data =req.body
    const publisherData = await publisherModel.create(data)
    
    res.send({msg: publisherData})
}

const createBook = async function(req,res){

    let data = req.body
    let findAuthorId = await authorModel.findById( data.author)
        
    let findPublisherId =await publisherModel.findById(data.publisher)
    
    if(!(data.author )) {
        res.send({msg: "Author id  is required"})
    }
    else if(! data.publisher){
        res.send({msg: " publisher id is required"})
    }
    else if(!findAuthorId ){
        res.send({msg:"write valid author Id"})
    }
    else if(!findPublisherId){
        res.send({msg:"write valid publisher Id"})
    }
    else{
        let bookData = await bookModel.create(data) 
                res.send({msg:bookData})
    }
        
}       
        
  const getAllBooks =async function(req,res){
    
    let allBooks =await bookModel.find().populate('author').populate("publisher")
    
    res.send({msg:allBooks})

  }  
  const updateBook= async function(req,res){
     
    let x= await publisherModel.find({name:{$in:["Panguin","HarperCollins"]}}).select({_id:1})
    for(let i in x){
        let data =await bookModel.updateMany(
            {publisher:x[i]._id},
            {$set:{isHardCover:true}},
            {new:true}
        )
    }
    const data = await bookModel.find().populate("publisher")
   
   res.send({msg:data})
   
  }
  const rating = async function(req,res){
     let data = await authorModel.find({rating:{$gt:3.5}}).select({_id :1})
     for(let i in data){
       let y= data[i]._id
         let book = await bookModel.updateMany(
            {author:y},
            {$inc:{price:10}})
         
     }
     let allBooks =await bookModel.find().populate('author')
    
    res.send({msg:allBooks})

  }


module.exports.createAuthor= createAuthor
module.exports.createPublisher=createPublisher
module.exports.createBook =createBook
module.exports.getAllBooks=getAllBooks
module.exports.updateBook=updateBook
module.exports.rating=rating



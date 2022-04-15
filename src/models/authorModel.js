const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema( {
    
    author_name: String,
    age:Number,
    address:String,
    rating: Number

}, { timestamps: true });

module.exports = mongoose.model('newAuthor', authorSchema)
// { 
// _id: ObjectId("61951bfa4d9fe0d34da86829"),
// authorName:"Chetan Bhagat",
// age:50,
// address:"New Delhi",
// rating: 2
// }

const mongoose = require('mongoose');
const ObjectId=mongoose.Schema.Types.ObjectId
const moment = require('moment')


const orderSchema = new mongoose.Schema( {
    // Write the schema content
    
	userId: {
        type:ObjectId,
        ref:"Userdocument"
    },
	productId: {
        type:ObjectId,
        ref:"Product"
    },
	amount: Number,
	isFreeAppUser: Boolean, 
    date: {
        type: Date,
         default:Date.now()
        //  .format("DD/MM/YYYY")
    }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema) 

const mongoose = require('mongoose')

const collegeSchema = new mongoose.Schema({
      
   
    name: {
        type: String,
        trim: true,
        required: "Name is required",
        unique: true
    },
    fullName: {
        type: String,
        trim: true,
        required: "college fullName is required"
    },
    logoLink: {
        type: String,
        required:true
        
    },
    isDeleted: {
        type: Boolean,
        default: false
    }

    
}, { timestamps: true })

module.exports = mongoose.model('college', collegeSchema)
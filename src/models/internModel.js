const mongoose = require('mongoose')
const id = mongoose.Schema.Types.ObjectId

const internSchema = new mongoose.Schema({

    name: {
        type: String,
        trim: true,
        required: "Intern name is required"
    },
    email: {
        type: String,
        trim: true,
        required: "email id is required",
        unique: true,
        
    },
    mobile: {
        type: String,
        unique: true,
       required:"mobile no. is required"
    },
    collegeId: {
        type: id,
        ref: "college"

    },
    isDeleted: {
        type: Boolean,
        default: false
    }

  

}, { timestamps: true })

module.exports = mongoose.model('intern', internSchema)
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
        required: true,
        unique: true,
        
    },
    mobile: {
        type: String,
        unique: true,
       required:true
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
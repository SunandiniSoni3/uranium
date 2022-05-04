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
        default: "https://functionup.s3.ap-south-1.amazonaws.com/colleges/iith.png"
    },
    isdeleted: {
        type: Boolean,
        default: false
    }

    //      name: { mandatory, unique, example iith}, 
    // fullName: {mandatory, example `Indian Institute of Technology, Hyderabad`}, 
    // logoLink: {mandatory}, isDeleted: {boolean, default: false} 
}, { timestamps: true })

module.exports = mongoose.model('college', collegeSchema)
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
        ////
    },
    mobile: {
        type: String,
        unique: true,
        ////
    },
    collegeId: {
        type: id,
        ref: "college"

    },
    isDeleted: {
        type: Boolean,
        default: false
    }

    // { name: {mandatory}, email: {mandatory, valid email, unique},
    //  mobile: {mandatory, valid mobile number, unique}, 
    //  collegeId: {ObjectId, ref to college model, 
    //     isDeleted: {boolean, default: false}}

}, { timestamps: true })

module.exports = mongoose.model('intern', internSchema)

const collegeModel = require("../models/college.Model")

const internModel = require("../models/internModel")

const isValidReq = function (value) {
    return Object.keys(value).length > 0
}

const isValid = (value) => {
    if (typeof value == 'undefined' || typeof value == null) return false;
    if (typeof value == 'string' && value.trim().length == 0) return false;
    return true

}


const postCollege = async (req, res) => {
    try {

        let data = req.body
        let { name, fullName, logoLink, isDeleted } = data

        if (!isValidReq(data)) {
            return res.status(400).send({ status: false, message: "please provide college details" })
        }

        // name validation
        if (!isValid(name)) {
            return res.status(400).send({ status: false, message: "please enter valid college name " })
        }
        if (!/^[a-zA-z]{2,10}$/.test(name)) {
            return res.status(400).send({ status: false, message: "please enter valid college name " })
        }
        let check = await collegeModel.findOne({ name: name })
        if (check) {
            return res.status(400).send({ status: false, message: "this college is already exist" })
        }
        //  fullName validation
        if (!isValid(fullName)) {
            return res.status(400).send({ status: false, message: "please enter valid college full name " })
        }
        //***************full name including no.s plz check */ 

        //  url validation
        let regex = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
        if (!regex.test(logoLink)) {
            return res.status(400).send({ status: false, message: "please enter valid college logo link " })
        }

        //  delete key validation
        if (isDeleted) {
            if (typeof isDeleted !== "boolean") {
                return res.status(400).send({ status: false, message: "isDeleted is boolean ,it can be true or false " })
            }
        }

        //  document creation
        let create = await collegeModel.create(data)
        return res.status(201).send({ status: true, data: create })


    }
    catch (err) {
        return res.status(500).send({status:"error",message:err.message})
     }
}


const postIntern = async (req, res) => {
    try {
        let data = req.body
        let { name, mobile, email, collegeName } = data

        // data val;idation
        if (!isValidReq(data)) {
            return res.status(400).send({ status: false, message: "please provide intern details" })
        }
        //***************full name including no.s plz check */ 

        // collegeName validation
        if (!isValid(collegeName)) {
            return res.status(400).send({ status: false, message: "please enter valid college name " })
        }
        if (!/^[a-zA-z]{2,10}$/.test(collegeName)) {
            return res.status(400).send({ status: false, message: "please enter valid college name " })
        }

        let check = await collegeModel.findOne({ name: collegeName })
        if (!check) {
            return res.status(404).send({ status: false, message: "this college doesn't exist" })
        }


        let id = check["_id"] // collegeId

        let document = {
            name: name,
            mobile: mobile,
            email: email,
            collegeId: id
        }

        // name validation
        if (!isValid(name)) {
            return res.status(400).send({ status: false, message: "please enter valid college name " })
        }


        //   mobile validation
        if (!isValid(mobile)) {
            return res.status(400).send({ status: false, message: "please enter mobile no. " })
        }
        if (!/^[0-9]{10}$/.test(mobile)) {
            return res.status(400).send({ status: false, message: "please enter valid 10 digit mobile no. " })
        }
        let mobileCheck = await internModel.findOne({ mobile: mobile })
        if (mobileCheck) {
            return res.status(404).send({ status: false, message: "this mobile no. already exist" })
        }

        // email validation
        if (!isValid(email)) {
            return res.status(400).send({ status: false, message: "please enter email" })
        }
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            return res.status(400).send({ status: false, message: "please enter valid email address. " })
        }
        let emailCheck = await internModel.findOne({ email: email })
        if (emailCheck) {
            return res.status(404).send({ status: false, message: "this email already exist" })
        }

        // create intern
        let createIntern = await internModel.create(document)
        return res.status(201).send({ status: true, data: createIntern })

    }
    catch (err) {
        return res.status(500).send({ status: "error", message: err.message })
    }
}
// *******************************************************************************************************

const collegeDetails = async (req,res)=>{
    try{
        let data = req.query
        if(!isValidReq(data)){
            return res.status(400).send({ status: false, message: "please enter data" })
        }
        collegeName= data.collegeName
        if(!collegeName){
          
            return res.status(400).send({ status: false, message: "please provide collegeName" })
        }
         // collegeName validation
         if (!isValid(collegeName)) {
            return res.status(400).send({ status: false, message: "please enter valid college name " })
        }
        if (!/^[a-zA-z]{2,10}$/.test(collegeName)) {
            return res.status(400).send({ status: false, message: "please enter valid college name " })
        }

        let check = await collegeModel.findOne({ name: collegeName })
        if (!check) {
            return res.status(404).send({ status: false, message: "this college doesn't exist" })
        }

        let id = check["_id"]

        let findIntern = await internModel.find({collegeId:id})
        if(!findIntern.length){
            return res.status(404).send({ status: false, message: "there are no interns for this college" })

        }
        let arr = findIntern.map(x=>{delete x.isDeleted
        return x})
        let document ={
            name: collegeName,
            fullName: check.fullName,
            logoLink: check.logoLink,
            interests: arr
        }

        return res.status(200).send({data:document})

    }
    catch(err){
        return res.status(500).send({status:"error",message:err.message})
    }
}
module.exports.postCollege = postCollege
module.exports.postIntern = postIntern
module.exports.collegeDetails = collegeDetails
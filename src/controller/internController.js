const collegeModel = require("../models/collegeModel")

const internModel = require("../models/internModel")
const isValidReq = function(value) {
    return Object.keys(value).length > 0
}

const isValid = (value) => {
    if (typeof value == 'undefined' || typeof value == null) return false;
    if (typeof value == 'string' && value.trim().length == 0) return false;
    return true

}


const postIntern = async(req, res) => {
    try {
        let data = req.body
        
        let { name, mobile, email, collegeName } = data

        // data validation
        if (!isValidReq(data)) {
            return res.status(400).send({ status: false, message: "Please provide intern details." })
        }
        

        // collegeName validation
        if (!isValid(collegeName)) {
            return res.status(400).send({ status: false, message: "Please enter college name. " })
        }
        if (!/^[a-zA-Z.-]+$/.test(collegeName)) {
            return res.status(400).send({ status: false, message: "Please enter valid college name. " })
        }

        let check = await collegeModel.findOne({ name: collegeName })
        if (!check||check.isDeleted===true) {
            return res.status(404).send({ status: false, message: "This college doesn't exist." })
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
            return res.status(400).send({ status: false, message: "Please enter intern name." })
        }
        if(!/^[A-Za-z\s]{1,}[\.]{0,1}[A-Za-z\s]{0,}$/.test(name)){
            return res.status(400).send({status: false, message: "Please enter valid intern name." })
        }



        //   mobile validation
        if (!isValid(mobile)) {
            return res.status(400).send({ status: false, message: "Please enter mobile number. " })
        }
        if (!/^(\+\d{1,3}[- ]?)?\d{10}$/.test(mobile)) {
            return res.status(400).send({ status: false, message: "Please enter valid 10 digit mobile number. " })
        }
        let mobileCheck = await internModel.findOne({ mobile: mobile })
        if (mobileCheck) {
            return res.status(404).send({ status: false, message: "This mobile no. already exist." })
        }

        // email validation
        if (!isValid(email)) {
            return res.status(400).send({ status: false, message: "Please enter email." })
        }
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            return res.status(400).send({ status: false, message: "Please enter valid email address. " })
        }
        let emailCheck = await internModel.findOne({ email: email })
        if (emailCheck) {
            return res.status(404).send({ status: false, message: "This email already exist." })
        }

        // create intern
        let createIntern = await internModel.create(document)

        var { isDeleted,name:name2,email:email1,mobile:mobile1,collegeId}=createIntern
      
        return res.status(201)
        .send({
            isDeleted:isDeleted,
            name:name2,
            email:email1,
            mobile:mobile1,
            collegeId:collegeId
        })

    } catch (err) {
        return res.status(500).send({ status: "error", message: err.message })
    }
}


module.exports.postIntern = postIntern
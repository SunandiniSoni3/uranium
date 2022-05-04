const collegeModel = require("../models/collegeModel")

const internModel = require("../models/internModel")


const postIntern = async(req, res) => {
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

    } catch (err) {
        return res.status(500).send({ status: "error", message: err.message })
    }
}

module.exports.postIntern = postIntern
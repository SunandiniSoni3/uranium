const collegeModel = require("../models/collegeModel")

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
            return res.status(400).send({ status: false, message: "Please enter college name " })
        }
        if (!/^[a-zA-Z.-]+$/.test(name)) {
            return res.status(400).send({ status: false, message: "Please enter valid college name " })
        }
        let check = await collegeModel.findOne({ name: name })
        if (check) {
            return res.status(400).send({ status: false, message: "This college is already exist." })
        }

        //  fullName validation
        if (!isValid(fullName)) {
            return res.status(400).send({ status: false, message: "Please enter  college full name. " })
        }
        if (!/^[A-Za-z,\s]{1,}[\.]{0,1}[A-Za-z,\s]{0,}$/.test(fullName)) {
            return res.status(400).send({ status: false, message: "Please enter valid full name of college." })
        }


        //  url validation
        if (!isValid(logoLink)) {
            return res.status(400).send({ status: false, message: "Please enter logo link of the clg ." })
        }
        let regex = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
        if (!regex.test(logoLink)) {
            return res.status(400).send({ status: false, message: "Please enter valid college logo link ." })
        }

        //  delete key validation
        if (isDeleted) {
            if (typeof isDeleted !== "boolean") {
                return res.status(400).send({ status: false, message: "isDeleted is boolean ,it can be either true or false. " })
            }
        }

        //  document creation
        let create = await collegeModel.create(data)

       
        return res.status(201) .send({ status: true,data: create})


    } 
    catch (err) {
        return res.status(500).send({ status: "error", message: err.message })
    }
}



// *******************************************************************************************************

const collegeDetails = async (req, res) => {
    try {
        let data = req.query

        collegeName = data.collegeName

        // collegeName validation
        if (!isValidReq(data) || !isValid(collegeName)) {
            return res.status(400).send({ status: false, message: "Please enter college name." })
        }

        if (!/^[a-zA-Z.-]+$/.test(collegeName)) {
            return res.status(400).send({ status: false, message: "Please enter valid college name. " })
        }

        let check = await collegeModel.findOne({ name: collegeName })
        if (!check || check.isDeleted) {
            return res.status(404).send({ status: false, message: "This college doesn't exist." })
        }

        let id = check["_id"]
        

        let findIntern = await internModel.find({ collegeId: id, isDeleted: false }).select({ _id: 1, name: 1, email: 1, mobile: 1 })

    
        if (!findIntern.length) {
            return res.status(404).send({ status: false, message: "There are no interns for this college." })

        }

        let document = {
            name: collegeName,
            fullName: check.fullName,
            logoLink: check.logoLink,
            interests: findIntern
        }

        return res.status(200).send({status:true, data: document })

    }
    catch (err) {
        return res.status(500).send({ status: "Error", message: err.message })
    }
}
module.exports={ postCollege,collegeDetails}


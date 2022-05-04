const express = require('express');
const router = express.Router();
const cController =require("../controller/collegeController")
const pController = require("../controller/internController")





router.post("/functionup/colleges",cController.postCollege)
router.post("/functionup/interns",pController.postIntern)
router.get("/functionup/collegeDetails",cController.collegeDetails)

module.exports = router;
const express = require('express');
const router = express.Router();
const cController =require("../controller/collegeController")



router.post("/functionup/colleges",cController.postCollege)
router.post("/functionup/interns",cController.postIntern)
router.get("/functionup/collegeDetails",cController.collegeDetails)

module.exports = router;
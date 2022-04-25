const express = require('express');
const router = express.Router();
const userController= require("../controllers/userController")
const authMiddleWare = require("../middleWare/auth")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})
try{
router.post("/users", userController.createUser  )

router.post("/login", userController.loginUser)

//The userId is sent by front end
router.get("/users/:userId", authMiddleWare.mid1,authMiddleWare.mid2,userController.getUserData)

router.put("/users/:userId",authMiddleWare.mid1,authMiddleWare.mid2, userController.updateUser)
router.delete("/users/:userId",authMiddleWare.mid1,authMiddleWare.mid2,userController.deleteUser)
}
catch(err){
    console.log(err.message)
    res.status(500).send(err.message)
}
module.exports = router;
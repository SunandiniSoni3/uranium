const express = require('express');
const router = express.Router();


const allController= require("../controllers/bookController")


router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/create-author", allController.createAuthor )
router.post("/create-publisher",allController.createPublisher)
router.post("/create-book",allController.createBook)
router.get("/get-all-books",allController.getAllBooks)



module.exports = router;
const express = require('express');
const router = express.Router();


const allController= require("../controllers/bookController")




router.post("/create-author", allController.createAuthor )
router.post("/create-publisher",allController.createPublisher)
router.post("/create-book",allController.createBook)
router.get("/get-all-books",allController.getAllBooks)
router.put("/books",allController.updateBook)
router.put("/rating",allController.rating)



module.exports = router;
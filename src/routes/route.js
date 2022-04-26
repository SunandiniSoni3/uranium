const express = require('express');
const router = express.Router();

const allControler = require("../../controller/allController")


router.post("/createAuthor", allControler.createAuthor)

router.post("/createBlogs", allControler.createBlogs)




module.exports = router;
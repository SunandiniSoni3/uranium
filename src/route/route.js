const express= require("express")
const router= express.Router()

const {createUrl,redirectUrl} = require("../controller/urlController")



router.post("/url/shorten",createUrl)
router.get('/:urlCode',redirectUrl )



module.exports = router;
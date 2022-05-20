const express= require("express")
const router= express.Router()

const {createUrl,redirectUrl,flushw} = require("../controller/urlController")



router.post("/url/shorten",createUrl)
router.get('/:urlCode',redirectUrl )
router.put("/url",flushw)


module.exports = router;
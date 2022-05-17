
const urlModel = require("../model/urlModel")
const validUrl = require('valid-url')
const shortid = require('shortid')

const createUrl = async (req,res)=>{

try {
    let data = req.body
    let baseUrl = "http://localhost:3000"

    const {longUrl} = data

    if(!validUrl.isUri(longUrl)){
        return res.status(400).send({status: false, message: " please enter valid url"})
    }
    const urlCode = shortid.generate()

    const checkCode = await urlModel.findOne({urlCode:urlCode})
    if(checkCode){
        return res.status(400).send({status: false, message: " this url Code already exist"})
    }

    const shortUrl = baseUrl+"/" + urlCode

    data["shortUrl"]=shortUrl
    data['urlCode']=urlCode

    const create = await urlModel.create(data)
    return res.status(201).send({  status: true, data:create })

    
}
 catch (error) {
     return res.status(500).send({status:"error",message:"error.message"})

    
}
}

module.exports = {createUrl}
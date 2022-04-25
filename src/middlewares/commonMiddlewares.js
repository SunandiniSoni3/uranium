

const mid1= function ( req, res, next) {
    try{
        let x = "isfreeappuser"||"isFreeAppUser"
        
    if(x in req.headers){ 
        //counter
        next()
    }
    else{
        res.send("request is missing a mandatory header")
    }
    }
    catch(err){
        console.log(err.message)
        res.status(500).send({status:"server Error",Error:err.message})
    }
}
const mid2 = (req,res,next)=>{
    req['isFreeAppUser'] = 'true'
    res.send(req['isFreeAppUser'])
    


}

module.exports.mid1= mid1
module.exports.mid2= mid2



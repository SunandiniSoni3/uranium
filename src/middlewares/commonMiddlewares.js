

const mid1= function ( req, res, next) {
    
   if("isfreeappuser" in req.headers){ 
    //counter
    next()
   }
   else{
       res.send("request is missing a mandatory header")
   }
}

module.exports.mid1= mid1

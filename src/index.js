const express= require("express")
const bodyParser= require("body-parser")
const route= require("../src/route/route")
const mongoose= require("mongoose")
const redis = require("redis");
const app= express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb+srv://Uranium-Batch:aruSjkdGdfhc9MRK@functionup.eel5r.mongodb.net/group16Database", {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )


app.use('/', route);

app.all("*",(req,res)=>{
    throw new Error("Bad request")
})
app.use((e,req,res,next)=>{
    if(e.message === "Bad request"){
        res.status(400).send({status:false,error:e.message})
    }
})

app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});






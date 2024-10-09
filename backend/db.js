const mongoose= require("mongoose");
const mongoURI= "mongodb://0.0.0.0/inotebook"
const connectToMongo=()=>{
    mongoose.connect(mongoURI).then(()=>{
        console.log("connected successfully to mongo")
    })
    
}
module.exports= connectToMongo
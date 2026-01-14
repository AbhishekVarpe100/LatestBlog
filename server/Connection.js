
const mongoose=require('mongoose')
require('dotenv').config()
exports.Connection=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Connected")
    }
    catch(err){
        console.log("Not connected")
    }
}


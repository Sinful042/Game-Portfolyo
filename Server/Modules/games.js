const mongoose= require("mongoose")

const gameScheme = new mongoose.Schema({
    name:String,
    type:String,
    releasedate:Date,
    description:String,
    image:Buffer,
    createdAT:{
     type:Date,
     default:Date.now,
    }

});



module.exports=mongoose.model("Game",gameScheme);
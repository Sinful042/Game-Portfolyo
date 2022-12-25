const mongoose = require("mongoose")




const userScheme = new mongoose.Schema({
       eMail:String,
       name:String,
       surname:String,
       username:String,
       password:Number,
       authority:String,
       createdAT:{
        type:Date,
        default:Date.now,
       }

});



module.exports=mongoose.model("UserVisit",userScheme);
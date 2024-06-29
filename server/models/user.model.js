const mongoose = require("mongoose")
const User =new mongoose.Schema({
    secret:{type:String , required:true },
    playlist:{type:Array , required:true},
    prompt:{type:String , required:true},
    songInfo:{type:Array,maxItems:7 },
    quote :{type:String},
}, {collection:'user'})

const model=mongoose.model('Userdata',User);
module.exports=model;



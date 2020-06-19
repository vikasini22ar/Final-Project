var mongoose=require("mongoose");
var passportLocal=require("passport-local-mongoose");
const passport = require("passport");

var detailsSchema=new mongoose.Schema({
    urname:String,
    email:String,
    phone:String,
    userId:{
        id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        name:String
    }
})
detailsSchema.plugin(passportLocal);
module.exports=mongoose.model("details",detailsSchema);
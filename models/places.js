var mongoose=require("mongoose");

// schema setup
var placeSchema =new mongoose.Schema({
    name: String,
    image: String,
    date: String,
    description: String,
        visited: Boolean,
        bucketlist: Boolean,
    author: String,
       
    
    placeid:{
        id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    }
});
module.exports =mongoose.model("Place", placeSchema);
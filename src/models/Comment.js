const mongoose = require("mongoose");




const commentSchema = new mongoose.Schema({
post:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Post",
    required:[true,"Post is Required"]
},
author:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:[true,"Post is Required"]
},
text:{
    type:String,
    trim:true,
    required:[true,"Comment Is Required"],
    maxlength:1000
}

} ,{timestamps:true});


const Comment = mongoose.model("Comment" , commentSchema);
module.exports = Comment
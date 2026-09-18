const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:true,
        required:[true , "Username is Required"],
        trim:true,
        minlength:3,
        maxlength:30
    },
    email:{
        type:String,
        unique:true,
        required:[true , "Email is Required"],
        trim:true,
        lowercase:true,
        match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],   
    },
    password:{
        type:String,
        required:[true , "Email is Required"],
        select:false,
        minlength:6,
    },
    bio:{
        type:String,
        default:"",
        maxlength:200,
        trim:true
    },
    avatarUrl:{
        type:String,
        default:""
    },
    


}, {timestamps:true} )



const User = mongoose.model("User" , userSchema);



module.exports = User
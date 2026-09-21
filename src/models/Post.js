const mongoose = require("mongoose");



const postSchema = new mongoose.Schema({
    title:{
        type:String,
        trim:true,
        required:[true,"Title is Required"],
        maxlenght:150,
    },
    slug:{
        type:String,
        unique:true,
        index:true
    },
    content:{
        type:String,
        required:[true,"Content is Required"]
    },
    coverImageUrl:{
        type:String,
        default:"",
    },
    tags:{
        type:[String],
        index:true,
        set: (tags) => tags.map((t) => t.toLowerCase().trim())
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:[true,"Author Is Required"]
    },
    status:{
        type:String,
        default:"draft",
        enum:["draft","public"]
    }

},{timestamps:true})


postSchema.index({title:"text" , content:"text"})


const Post = mongoose.model("Post"  , postSchema);

module.exports = Post;
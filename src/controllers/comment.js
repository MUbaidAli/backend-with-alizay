const Comment = require("../models/Comment");
const Post = require("../models/Post")
const {asyncHandler, AppError} = require("../utils/error")


const createComment =  asyncHandler( async (req,res) =>{

const {postId} = req.params;

const post = await Post.findById(postId);

if(!post) throw new AppError(404,"Post Not Found");

console.log(post)
const comment = await Comment.create({post:post.id ,author:req.user._id,text:req.body.text })
const populated = await comment.populate("author" , "username avatarUrl")

console.log(populated)
res.status(201).send({success:true,message:"Comment Created",data:populated})
})


const getAllComments = asyncHandler(async (req,res)=>{

        const{postId} = req.params;

        const comments = await Comment.find({post:postId}).populate("author" , "username avatarUrl")
        console.log(comments)

    res.status(200).send({success:true,message:"Comments fetched Successfully" , data:comments})

})




const deleteComment = asyncHandler(async (req,res)=>{

    const comment = await Comment.findById(req.params.commentId);

    if(!comment){
        throw new AppError(404,"Comment Not Found")

    }

    if(req.user._id.toString() !== comment.author._id.toString()){

        throw new AppError(401 , "Authorization Error: Your Are Not Allowed TO Delete Comment");

    }


    await comment.deleteOne();


res.status(200).send({success:true,message:"comment Delete Successfully" , data:{}})


 })






module.exports  = {createComment,getAllComments,deleteComment}
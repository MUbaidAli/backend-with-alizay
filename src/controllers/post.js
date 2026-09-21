const Post = require("../models/Post")
const slugify = require('slugify')

// private Routes


const { AppError, asyncHandler } = require("../utils/error");

const createPost  = asyncHandler( async function (req,res){
    const {title , content,coverImageUrl,tags,author,status} = req.body;

        if(!title || !content){
                throw new AppError(400, "Title and Content Are Required")
        } 

        const slugifyy = slugify(title);

        const data = await Post.create({title , content,coverImageUrl,tags,author,status,slug:slugifyy}) 





res.status(201).send({success:true,message:"Post Created Successfully",data})



})



// get Single Post

const getSinglePost = asyncHandler( async  function(req,res){

        const {slug} = req.params
        console.log(req.params)
// console.log(slug)

        const data = await Post.findOne({slug}).populate("author" , "username avatarUrl bio");
           if(!data) {
                    throw new AppError(404,"Post Not Found")
           } 

res.status(200).send({success:true,message:"Post Fetched Successfully",data})



})




//  delete Post

const deletePost = asyncHandler(async (req,res) => {
    const {id} = req.params;

        const post = await Post.findById(id);

        if(!post){
            throw new AppError(404  , "Post Not Found")
        }




        console.log(req.user)
        console.log(post)
        if(post.author.toString() !== req.user._id.toString() ){
            throw new AppError(403 , "Not authorized to delete this post")
        }


    // const data = await Post.findByIdAndDelete({id});
        await post.deleteOne();

res.status(200).send({success:true,message:"Post Deelted Successfully",data:{}})




})


// Update Route

const updatePost = asyncHandler(async function(){

    const {id} = req.params;

    const post = await Post.findById(id);


    if(!post){
        throw new AppError(404,"Post Not Found")
    }



    if(post.author.toString() !== req.user._id.toString()){
        throw new AppError(404,"You Are not Authorized To Update this Post")
    }


     const { title, content, tags, coverImageUrl, published } = req.body;

    if (title !== undefined) post.title = title;
  if (content !== undefined) post.content = content;
  if (tags !== undefined) post.tags = tags;
  if (coverImageUrl !== undefined) post.coverImageUrl = coverImageUrl;
  if (published !== undefined) post.published = published;


  await post.save();

 res.status(200).json({ success: true, message:"Post updated Successfully",data: post });

})




const getPosts = asyncHandler(async (req,res) =>{

    const {tag , search} = req.query;

    // pagination calculation

    const page = Math.max(parseInt(req.query.page) || 1,1 );
    const limit = Math.min(parseInt(req.query.limit) || 10 , 50 )
    const skip = (page - 1) * limit;

        const filter = {status:"public" }
         if(tag) filter.tags = tag;
         if(search) filter.$text = {$search:search}      
        
console.log(tag)
    const [posts, total] = await Promise.all([
        Post.find(filter)
        .populate("author" , "username  avatarUrl")
        .sort({createdAt:-1})
        .skip(skip)
        .limit(limit),
        Post.countDocuments(filter)
    ])


    
 res.status(200).json({ success: true, message:"Posts Fetched Successfully",data: posts,pagination:{total,page,totalPages:Math.ceil(total/limit)} });

})



module.exports = {createPost , getSinglePost,deletePost ,updatePost,getPosts }




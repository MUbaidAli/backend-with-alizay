const express = require("express");
const router = express.Router();
const postController = require("../controllers/post");
const protect = require("../middlewares/protect");


router.post("/post" , postController.createPost)    
router.get("/post"  ,postController.getPosts)    
router.get("/post/:slug" , postController.getSinglePost)    
router.put("/post/:id" , protect ,postController.updatePost)    
router.delete("/post/:id" , protect ,postController.deletePost)    





module.exports  = router;


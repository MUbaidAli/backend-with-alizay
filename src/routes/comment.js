const express = require("express");
const { createComment,getAllComments } = require("../controllers/comment");
const protect = require("../middlewares/protect");
const router  = express.Router();





router.get("/comment/:postId" , getAllComments)
router.post("/comment/:postId" ,protect, createComment)


module.exports = router
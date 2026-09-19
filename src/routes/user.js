const express = require("express");
const { register, login,profile } = require("../controllers/user");
const protect = require("../middlewares/protect");
const router = express.Router();




router.post("/register" , register);
router.post("/login" , login);
router.get("/me" , protect,profile);




module.exports = router
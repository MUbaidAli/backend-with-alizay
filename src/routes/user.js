const express = require("express");
const { register, login,profile } = require("../controllers/user");
const protect = require("../middlewares/protect");
const extramd = require("../middlewares/extramid");
const validate = require("../middlewares/validate");
const { registerSchema, loginSchema } = require("../validators/authValidators");
const router = express.Router();




router.post("/register" ,validate(registerSchema), register);
router.post("/login", validate(loginSchema) , login);
router.get("/me" , protect ,profile);




module.exports = router
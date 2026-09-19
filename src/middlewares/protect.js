const User = require("../models/User");
const { AppError } = require("../utils/error");
const jwt = require("jsonwebtoken")
async function protect(req,res,next){

    console.log("-----Protect Middleware ----")
let token;
    // extract token 
    const authHeader = req.headers.authorization;

    if(!authHeader){
        throw new AppError(401,"Unauthorized: No Token Provided")
    }
    token = authHeader.split(" ")[1]
    
    // decode token 

    const decoded =  jwt.verify(token,process.env.JWT_SECRET);

    if(!decoded){
            throw new AppError(401,"Unauthorized: Token is Expired Or Wrong")

    }

    // get user Data 
    const user = await User.findById(decoded.userId).select("-password");

// console.log(user)
    req.user = user





next()


}

module.exports = protect
const User = require("../models/User");
const { AppError, asyncHandler } = require("../utils/error");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const { registerSchema } = require("../validators/authValidators");
const register=  asyncHandler( async function (req,res,next){

    // extract data from body

    console.log("runniggggg")

const {username,email,password} = req.body;
// console.log(body)

    // check  email exist if exist thorw an error
    const isUserExist = await User.findOne({email})
    console.log(isUserExist)
    if(isUserExist){
        throw new AppError(402,"Email Already Exist")
    }

    
    // password Hash
    const hashed = await bcrypt.hash(password,10)
    // console.log(`hashed: ${hashed}`)

    // save in database
    const data = await User.create({username, email, password:hashed})

    // generate token 
    // console.log(data._id , data.id)
    const token = jwt.sign({userId:data.id,username:data.username,email:data.email} , process.env.JWT_SECRET , {expiresIn:"7d"} );

    // send token http Cookies or in res
        
    res.status(201).send({success:true , data , token})

})


// login
const login = asyncHandler(async function (req,res){
// data extract 
const { email , password} = req.body;


// user exist or not

    const user = await User.findOne({email}).select("+password");
// console.log(user)
    if(!user){
        throw new AppError(404 , "Email and Password Is Wrong")
    }

    //  compare password
    const isMatched = await bcrypt.compare(password , user.password)
// console.log(isMatched)
    if(!isMatched){
        throw new AppError(401,"Password Is Wrong");
    } 
// generate token

    const token = jwt.sign({userId:user.id} , process.env.JWT_SECRET, {expiresIn:"7d"})

res.status(200).send({success:true, data:{id:user.id,email:user.email,username:user.username } , token})


})





// /profile private 

// /me 

const profile =  async function (req,res){

const data  = req.user;
console.log(data)
    res.status(200).send({success:true, data})


}






module.exports = {register , login,profile}
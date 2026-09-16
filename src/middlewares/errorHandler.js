const { AppError } = require("../utils/error");

function notFound(req,res,next){

const error = new AppError(404, "Api Route Not Exist")
next(error)

}




function errorHandler(err,req,res,next){
const {statusCode = 500 , message = "Internal Server Error"} = err



res.status(statusCode).json({
    success:false ,
    message,

    ...(process.env.NODE_ENV !== "production" && {stack:err.stack})
})



}



module.exports = {notFound , errorHandler}
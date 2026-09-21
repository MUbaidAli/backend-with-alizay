function extramd(req,res,next){

    console.log("------------extra middleware--------------")

next()
}


module.exports = extramd
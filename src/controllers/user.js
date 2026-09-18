function register(req,res){

const body = req.body;
console.log(body)

// check username exist or email exist if exist thorw an error
// password Encode 
// save in database
// generate token 



res.send("register Route" , body)

}


function login(req,res){

res.send("Login Route")


}

module.exports = {register , login}
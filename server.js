const express  = require("express");
const app = express();
require("dotenv").config();
const health  = require("./src/routes/health")
const user  = require("./src/routes/user")
const ConnectDb = require("./src/config/connection");
const { notFound, errorHandler } = require("./src/middlewares/errorHandler");


app.use(express.json());
app.use(express.urlencoded({extended:true}))



// ConnectDb();
// api Routes middlewares
app.use("/api" , health)
app.use("/api" , user)



// Custom Error Handlers
app.use(notFound);
app.use(errorHandler)




const PORT = process.env.PORT ||  8484;
app.listen(PORT , ()=>{

console.log(`App is Running on PORT: ${PORT}`);

})

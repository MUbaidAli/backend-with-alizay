const express  = require("express");
const app = express();
require("dotenv").config();
const health  = require("./src/routes/health")
const ConnectDb = require("./src/config/connection");
const { notFound, errorHandler } = require("./src/middlewares/errorHandler");




ConnectDb();
// api Routes middlewares
app.use("/api" , health)



// Custom Error Handlers
app.use(notFound);
app.use(errorHandler)




const PORT = process.env.PORT ||  8484;
app.listen(PORT , ()=>{

console.log(`App is Running on PORT: ${PORT}`);

})

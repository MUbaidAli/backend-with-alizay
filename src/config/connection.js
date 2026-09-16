const mongoose = require("mongoose");


async function ConnectDb(){
    const MONGODB_URI = process.env.MONGODB_URI;
    
    try {
        
        if(!MONGODB_URI) throw new Error("Mongodb URI Missing");

       const conn  =  await mongoose.connect(MONGODB_URI)

        console.log(`MongoDb Connected Successfully`)



    } catch (error) {
        
    console.log(`Database Connection Failed: ${error.message} `)
    process.exit(1);

    }

}


module.exports = ConnectDb;
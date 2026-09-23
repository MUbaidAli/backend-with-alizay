const { AppError } = require("../utils/error");

const validate = (schema,property = "body" ) => (req,res,next) =>{


  const {error , value} =  schema.validate(req[propery] , {abortEarly:false,stripUnknown:true})

       if(error){
        const message = error.details.map((d) => d.message).join(",");
        throw new AppError(400,message)
       }
    


       req[property]= value;

       next()


}





module.exports = validate;
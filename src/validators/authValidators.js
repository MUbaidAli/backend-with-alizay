const Joi  = require("joi")



const registerSchema = Joi.object({
    username : Joi.string().trim().required().min(6).max(30).messages({
      'string.min': 'Username must be at least {#limit} characters long.',
      'string.max': 'username cannot exceed {#limit} characters.',
      'any.required':'You missed username add the username'
    }),
    email:Joi.string().trim().email().required().messages({
        'string.email':"email formate is worong"
    }),
    password:Joi.string().min(6).required(),

})



const loginSchema = Joi.object({
  
    email:Joi.string().trim().email().required(),
    password:Joi.string().min(6).required(),

})


module.exports = {loginSchema , registerSchema}
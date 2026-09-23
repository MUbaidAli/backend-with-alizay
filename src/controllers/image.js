const { asyncHandler, AppError } = require("../utils/error");
const cloudinary  = require("../config/cloudinary")




const imageController = asyncHandler( async (req,res) => {


// console.log(req.file)

if(!req.file){
    throw new AppError(401,"Please Upload An Image");
}


const result = await new Promise((resolve,reject)=>{
        const uploadStream = cloudinary.uploader.upload_stream({
            folder:"bb"
        },(error,result)=>{

                if(error){
                    reject(error);
                }else{
                    resolve(result)
                }


        }
    
    );
    uploadStream.end(req.file.buffer);
    
    
    
    
})

console.log(result)


res.status(200).send({success:true,message:"Image Upload Successfully",imageUrl:result.secure_url,publicId:result.public_id})




})


module.exports = imageController
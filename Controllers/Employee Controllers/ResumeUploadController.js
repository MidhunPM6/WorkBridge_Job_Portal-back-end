const Resume = require("../../Models/ResumeUpload");
const User =require("../../Models/User")

exports.resumeUpload=async(req,res)=>{

     const {userid} =req.body

    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded.' });
      }

      try {
        const resume=new Resume({
            filename:req.file.originalname,
            data:req.file.buffer,
            contentType:req.file.mimetype,


        })
        await resume.save()

        res.status(200).json({message:"File Upload successfully" ,resume:resume})

        const user =await User.findById(userid)
   
         if(!user){
           return res.status(404).json({message:"User not found"})
         }
         if (!Array.isArray(user.resume)) {
          user.resume = []; 
        }
       
        user.resume=resume._id
        await user.save() 
        
        
       
        
     
        
      } catch (error) {
        console.log(error)
      }
}


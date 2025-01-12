const Resume = require("../Models/ResumeUpload");

exports.resumeUpload=async(req,res)=>{
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

        res.status(200).json({message:"File Upload successfully"})
      } catch (error) {
        
      }
}


const AppliedJobs=require('../Models/Appliedjob')
const PostedJob=require('../Models/JobPostSchema')

exports.AppliedJob=async(req,res)=>{
    const {JobID,UserID}=req.body

    try { 
      console.log(JobID)
      console.log(UserID)

      
       const job= await PostedJob.findById(JobID)
       if(!job){
         return res.status(404).json({message:'Job not found'})
       } 

         const AppliedJob = new AppliedJobs({
            jobid:JobID,
            userid:UserID
        })

       await AppliedJob.save()
       res.status(201).json({ message: "Application submitted successfully!" });
        
    } catch (error) {
        res.status(400).json({error})
    }
}

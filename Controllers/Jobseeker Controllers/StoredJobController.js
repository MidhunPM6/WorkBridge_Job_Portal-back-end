const PostedJobs = require("../../Models/JobPostSchema")

exports.storedJob=async(req,res)=>{
    try {
        const Jobs=await PostedJobs.find()
        console.log(Jobs)
        res.status(200).json(Jobs)
       
    } catch (error) {
        res.status(400).json({message:"Failed to fetch Jobs"})
    }

} 
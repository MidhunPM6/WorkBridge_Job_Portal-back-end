const PostedJobs = require("../Models/JobPostSchema")



exports.jobPost=async(req,res)=>{
  
    const { tittle,comapany_name,location,salary,job_description,job_type}=req.body
    console.log(req.body);
    
    try {
        const StoreJobDetails=new PostedJobs({
            tittle:tittle,
            comapany_name:comapany_name,
            location:location,
            salary:salary,
            job_description:job_description,
            job_type:job_type,
        })
        await StoreJobDetails.save()
        res.status(200).json({message:"Successfully Posted",StoreJobDetails})
    } catch (error) {
        console.log("Error creating job post:", error);
        res.status(400).json({message:"Something went wrong"})
    }
}      
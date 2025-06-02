import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    
  },
  job_description: {
    type: String,
    
  },
  company_name: {
    type: String,
    
    
  },
  location: {
    type: String,
    
  },
  salary: {
    type: Number,
    
  },
  job_type: {
    type: String, 
    
  },
  userID :{
    type :String,
    
  }
 
},{timestamps :true });


export const JobPost = mongoose.model("jobPost", jobSchema)
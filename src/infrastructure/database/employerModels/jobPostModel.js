import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  job_description: {
    type: String,
    required: true,
  },
  company_name: {
    type: String,
    required: true,
    
  },
  location: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
    required: false, 
  },
  job_type: {
    type: String, 
    required: true,
  },
  userID :{
    type :String,
    required :true
  }
 
},{timestamps :true });


export const JobPost = mongoose.model("jobPost", jobSchema)
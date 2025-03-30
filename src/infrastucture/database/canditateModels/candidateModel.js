import mongoose from 'mongoose'

const CandidateSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique : true,
  },
  password: {
    type: String,
    required : false,
  },
  profilePic:{
    type:String,
    default : null 
  }
 
}, { timestamps: true })

export const  Candidate = mongoose.model('candidate',CandidateSchema)

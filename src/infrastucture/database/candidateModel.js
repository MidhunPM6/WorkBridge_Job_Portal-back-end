import mongoose from 'mongoose'

const CandidateSchema = mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  },
  password: {
    type: String,
  },
  profilePic:{
    type:String,
    default : null 
  }
 
}, { timestamps: true })

export const  Candidate = mongoose.model('candidate',CandidateSchema)

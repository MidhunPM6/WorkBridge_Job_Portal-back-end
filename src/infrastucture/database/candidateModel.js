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
 
}, { timestamps: true })

export const  Candidate = mongoose.model('candidate',CandidateSchema)

import mongoose, { Schema } from 'mongoose'

const ProfileSchema = new mongoose.Schema({
  designation: {
    type: String
  },
  mobile: {
    type: String,
    required :false
  },
  location: {
    type: String
  },
  portfolio: {
    type: String
  },
  linkedin: {
    type: String
  },
  about :{
    type : String,
  },
  skills: 
    [{type : String}],
     
  userID : {  
    type: Schema.Types.ObjectId,
    ref : 'Candidate'
  }
 
},{timestamps : true})

export const ProfileModel = mongoose.model('profile', ProfileSchema)

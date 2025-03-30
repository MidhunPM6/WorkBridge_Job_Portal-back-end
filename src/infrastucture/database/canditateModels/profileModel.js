import mongoose from 'mongoose'

const ProfileSchema = new mongoose.Schema({
  designation: {
    type: String
  },
  mobile: {
    type: String
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
  skills: {
    type : String,
    default : []
  }
},{timestamps : true})

export const ProfileModel = mongoose.model('profile', ProfileSchema)

import mongoose, { Schema } from 'mongoose'

const experienceSchema = new mongoose.Schema({
    
  position: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  StartDate : {
    type: String,
    required : true,
  },
  EndDate : {
    type : String ,
    required : true,
  },
  tasks :{
    type :String ,
    required : true,
  },
  userID : {
     type :Schema.Types.ObjectId,
     
  }

},{timestamps: true})

export const ExperienceModel = mongoose.model('Experience',experienceSchema)

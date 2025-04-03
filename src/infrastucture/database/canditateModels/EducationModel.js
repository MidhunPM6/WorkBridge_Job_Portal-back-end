import mongoose, { Schema, Types } from 'mongoose'

const educationSchema = new mongoose.Schema({
  college: {
    type: String,
    required: true
  },
  field: {
    type: String,
    required: true
  },
  StartDate: {
    type: String,
    required: true
  },
  Passed: {
    type: String,
    required: true
  },
  userID : {
    type :Schema.Types.ObjectId,
    required : true
  }
})
export const EducationModel = mongoose.model('Education',educationSchema)
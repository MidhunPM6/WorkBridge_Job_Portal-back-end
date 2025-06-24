import mongoose from 'mongoose'

const jobApplySchema = new mongoose.Schema(
  {
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'JobPost',
      required: true
    },
    userID: {
      type: mongoose.Schema.Types.ObjectId,

      ref: 'Candidate',

      required: true
    },
    employerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employer',
      required: true
    },
    profileId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'profile',
      required: true
    },
    educationIds: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'Education',
      required: true
    },
    experienceIds: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'Experience',
      required: true
    }
  },
  { timestamps: true }
)
const JobApplyModel = mongoose.model('JobApply', jobApplySchema)

export default JobApplyModel

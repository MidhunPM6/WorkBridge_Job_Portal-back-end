import JobApplyModel from '../../database/canditateModels/jobApplyModel.js'
import IJobApplyRepository from '../../../domain/repositories/candidate/IApplyJobRepository.js'
import mongoose from 'mongoose'

export default class JobApplyRepository extends IJobApplyRepository {
  async save (jobApplyData) {
    const jobApply = new JobApplyModel(jobApplyData)
    return (await jobApply.save()).populate('jobId employerId')
  }

  async findById (jobId, userID) {
    return await JobApplyModel.findOne({ jobId, userID })
  }

  async findAppliedJobIdsByUser (userId) {
    const applications = await JobApplyModel.find({ userID: userId })
      .select('jobId')
      .populate('jobId employerId')
      .lean()
    return applications
  }

  async findByEmployerId (employerId) {
    const jobs = await JobApplyModel.find({ employerId })
      .populate('jobId userID profileId educationIds experienceIds')
      .sort({ createdAt: -1 })
      .lean()
    return jobs
  }

  async updateApplicationStatus (jobId, userID, status) {
    const updateStatus = await JobApplyModel.updateOne(
      {
        jobId: jobId,
        userID: userID
      },
      {
        $set: { status }
      }
    )
    return updateStatus
  }
}

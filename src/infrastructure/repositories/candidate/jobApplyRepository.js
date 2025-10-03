import JobApplyModel from '../../database/canditateModels/jobApplyModel.js'
import IJobApplyRepository from '../../../domain/repositories/candidate/IApplyJobRepository.js'

export default class JobApplyRepository extends IJobApplyRepository {
  async save (jobApplyData,status) {
    const data = {...jobApplyData,status}

    const jobApply = new JobApplyModel(data)
    return (await jobApply.save()).populate('jobId employerId')
  }

  async findById (jobId, userID) {
    return await JobApplyModel.findOne({ jobId, userID })
  }

  async findAppliedJobIdsByUser (userId) {
    const applications = await JobApplyModel.find({ userID: userId })
      .select('jobId')
      .populate('jobId employerId status')
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

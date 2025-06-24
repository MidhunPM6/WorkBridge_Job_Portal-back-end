import JobApplyModel from '../../database/canditateModels/jobApplyModel.js'

import IJobApplyRepository from '../../../domain/repositories/candidate/IApplyJobRepository.js'

export default class JobApplyRepository extends IJobApplyRepository {
  async save (jobApplyData) {
    const jobApply = new JobApplyModel(jobApplyData)
    return await jobApply.save()
  }

  async findById (jobId, userID) {
    return await JobApplyModel.findOne({ jobId, userID })
  }

  async findAppliedJobIdsByUser (userId) {
    const applications = await JobApplyModel.find({ userID :userId }).select('jobId')
    return applications.map(app => app.jobId.toString())
  }

  async findByEmployerId (employerId) {
    const jobs = await JobApplyModel.find({ employerId }).populate('jobId userID profileId educationIds experienceIds').sort({ createdAt: -1 }).lean()
    return jobs
  }
  // async findAll() {
  //     return await JobApplyModel.find().populate('jobId userId employerId');
  // }

  // async deleteById(id) {
  //     return await JobApplyModel.findByIdAndDelete(id);
  // }
}

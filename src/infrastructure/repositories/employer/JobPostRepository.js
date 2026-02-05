import { JobPost } from '../../database/employerModels/jobPostModel.js'
import IPostJobRepository from '../../../domain/repositories/employer/IPostJobRepository.js'

export default class PostJobRepository extends IPostJobRepository {
  async create (jobData) {
    const jobPost = new JobPost({
      title: jobData.title,
      job_description: jobData.job_description,
      company_name: jobData.company_name,
      location: jobData.location,
      salary: jobData.salary,
      job_type: jobData.job_type,
      userID: jobData.userID
    })
    // Save to DB
    return await jobPost.save()
  }
  async fetchAllJobs () {
    const jobs = await JobPost.find().sort({ createdAt: -1 }).populate('userID').lean()
    return jobs
  }

  async findByEmployerId (employerId) {
    if (!employerId) {
      throw new Error('Employer ID is required')
    }
    const jobs = await JobPost.find({ userID: employerId })
      .sort({ createdAt: -1 })
      .lean()
    return jobs
  }

  async updateById (jobData) {
    if (!jobData) {
      throw new Error('Job data is required')
    }
    return JobPost.findByIdAndUpdate(jobData.id, jobData, {
      new: true,
      runValidators: true
    })
  }
  async findById (jobId) {
    if (!jobId) {
      throw new Error('Job ID is required')
    }
    return JobPost.findById(jobId).lean()
  }

  async delete (jobId) {
    if (!jobId) {
      throw new Error('Job ID is required')
    }
    return JobPost.findByIdAndDelete(jobId)
  }

  async searchJobs(searchData) {
   
    const query = {}

    if (searchData.title && searchData.title.trim() !== '') {
      query.title = { $regex: searchData.title, $options: 'i' }
    }

    if (searchData.location && searchData.location.trim() !== '') {
      query.location = { $regex: searchData.location, $options: 'i' }
    }

    const jobs = await JobPost.find(query).sort({ createdAt: -1 }).lean().populate('userID')
    return jobs
  }
}

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
      userID : jobData.userID
    })
    // Save to DB
    return await jobPost.save()
  }
}

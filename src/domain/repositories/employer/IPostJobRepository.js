export default class IPostJobRepository {
  async create (jobData) {
    throw new Error('The method create is required')
  }

  fetchAllJobs () {
    throw new Error('The method fetchAllJobs is required')
  }

  findByEmployerId (employerId) {
    throw new Error('The method findByEmployerId is required')
  }
}

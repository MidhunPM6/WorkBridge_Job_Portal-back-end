export default class IPostJobRepository {
  async create (jobData) {
    throw new Error('The method create is required')
  }

  fetchAllJobs () {
    throw new Error('The method fetchAllJobs is required')
  }
}

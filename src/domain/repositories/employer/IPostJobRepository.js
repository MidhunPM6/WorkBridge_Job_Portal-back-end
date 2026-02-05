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
  updateById (jobData) {
    throw new Error('The method updateById is required')
  }

  findById (jobId) {
    throw new Error('The method findById is required')
  }
  delete (jobId) {
    throw new Error('The method delete is required')
  }
  searchJobs(searchData){
    throw new Error("The method is required");
    
  }
}

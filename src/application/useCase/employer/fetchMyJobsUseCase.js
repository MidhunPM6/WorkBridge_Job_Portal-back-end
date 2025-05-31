export default class FetchMyJobsUseCase {
  constructor (jobRepository, jobEntity) {
    this.jobRepository = jobRepository
    this.jobEntity = jobEntity
  }
  async execute (employerId) {
    try {
      if (!employerId) {
        throw new Error('Employer ID is required')
      }

      const jobs = await this.jobRepository.findByEmployerId(employerId)
      if (!jobs || jobs.length === 0) {
        return []
      }
      return jobs.map(job => this.jobEntity.rehydrate({...job, id: job._id}))
    } catch (error) {
      console.error('Error fetching jobs:', error)
      throw new Error('Failed to fetch jobs')
    }
  }
}

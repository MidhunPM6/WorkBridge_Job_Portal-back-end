export default class FetchApplicationUseCase {
  constructor (jobRepository) {
    this.jobRepository = jobRepository
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
      console.log(jobs);
      
      return jobs
    } catch (error) {
      console.error('Error fetching jobs:', error)
      throw new Error('Failed to fetch jobs')
    }
  }
}

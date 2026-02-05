export default class SearchJobUseCase {
  constructor (jobRepository) {
    this.jobRepository = jobRepository
  }
  async execute (searchParams) {
    try {
      if (!searchParams) {
        throw new Error('Search parameters are required')
      }
      const results = await this.jobRepository.searchJobs(searchParams)
      return results
    } catch (error) {
      throw error 
    }
  }
}

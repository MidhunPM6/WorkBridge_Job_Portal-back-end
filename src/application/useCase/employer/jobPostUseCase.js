export default class JobPostUseCase {
  constructor (jobRepository, jobentity) {
    this.jobentity = jobentity
    this.jobRepository = jobRepository
  }
  async execute (jobData) {
    // Validate the input data
    console.log(jobData)

    if (!jobData) {
      throw new Error('All fields are required..')
    }
    try {
      const job = this.jobentity.create(jobData).toDTO()
      console.log(job);
      
      const newJobPost = await this.jobRepository.create(job)

      return newJobPost
    } catch (error) {
      console.error('Error creating job post:', error)
      throw new Error('Internal server error')
    }
  }
}

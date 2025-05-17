export default class JobPostUseCase {
  constructor (jobentity, jobRepository) {
    this.jobentity = jobentity
    this.jobRepository = jobRepository
  }
  async execute (data,userID) {
    // Validate the input data
    const { title, description, companyName, location, salary, jobType } = data
    if (
      !title ||
      !description ||
      !companyName ||
      !location ||
      !salary ||
      !jobType
    ) {
      throw new Error('All fields are required')
    }

    try {
        const jobData = {...data,userID}
      const job = this.jobentity.create(jobData).toDTO()
      const newJobPost = await this.jobRepository.create(job)
      return newJobPost
    } catch (error) {
      console.error('Error creating job post:', error)
      throw new Error('Internal server error')
    }
  }
}

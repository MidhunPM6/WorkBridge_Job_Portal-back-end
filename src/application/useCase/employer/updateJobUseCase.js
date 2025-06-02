export default class UpdateJobUseCase {
  constructor (jobRepository, jobEntity) {
    this.jobRepository = jobRepository
    this.jobEntity = jobEntity
  }

  async execute (jobData) {
    if (!jobData) {
      throw new Error('Job data is required')
    }

    const updatedJob = this.jobEntity.createPartial(jobData).toDTO()

    console.log(updatedJob)

    const existingJob = await this.jobRepository.findById(updatedJob.id)
    if (!existingJob) {
      throw new Error('Job not found')
    }
    // only change the fields that are provided in jobData

    return await this.jobRepository.updateById(updatedJob)
  }
}

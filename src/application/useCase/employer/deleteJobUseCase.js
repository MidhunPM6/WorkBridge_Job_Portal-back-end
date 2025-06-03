export default class DeleteJobUseCase {
  constructor (jobRepository, jobEntity) {
    this.jobRepository = jobRepository
    this.jobEntity = jobEntity
  }

  async execute (jobId) {
    console.log(jobId);
    
   
    try {
      const job = await this.jobRepository.findById(jobId)
      if (!job) {
        throw new Error('Job not found')
      }
      const jobRehydrated = this.jobEntity.rehydrate({...job,id:job._id}).toDTO()
      console.info('Job to be deleted:', jobRehydrated);
      const deletedJob = await this.jobRepository.delete(jobRehydrated.id)
      return deletedJob
    } catch (error) {
      console.error('Error deleting job:', error)
      throw new Error('Error deleting job')
    }
  }
}

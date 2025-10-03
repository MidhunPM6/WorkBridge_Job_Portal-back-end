export default class UpdateApplicationStatusUseCase {
  constructor (jobApplyRepository) {
      this.jobApplyRepository= jobApplyRepository
  }

  async execute(jobId,userId,status){
      if(!jobId || !userId || !status){
        throw new Error('The feilds are required')
      }

      console.log(jobId)

      try {
        const updateApplicationStatus = await this.jobApplyRepository.updateApplicationStatus(jobId,userId,status)
        if(!updateApplicationStatus){
          throw new Error ('The updation not completed')
        }
        return updateApplicationStatus
      } catch (error) {
        console.error(error)
        throw new Error (error.message)
      }
  }
}

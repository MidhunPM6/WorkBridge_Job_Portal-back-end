export default class AppliedJobUseCase {
  constructor (appliedRepository) {
    this.appliedRepository = appliedRepository
  }
  async execute(userID){
    try {
        if(!userID){
            throw new Error("User ID is required to continue");
            
        }
        const jobIds = await this.appliedRepository.findAppliedJobIdsByUser(userID)
        
        
        return jobIds
    } catch (error) {
        throw new Error(error.message);
    }
  }

}

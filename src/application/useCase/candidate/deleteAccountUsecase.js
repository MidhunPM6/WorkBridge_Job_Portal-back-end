export default class DeleteAccountUseCase {
  constructor (candidateRepository, candidateEntity) {
    this.candidateEntity = candidateEntity
    this.candidateRepository = candidateRepository
  }

  async execute (userID) {
    
    try {
      //  Find the candidate with userID , if not exist throw error
      const findCandidate = await this.candidateRepository.findByID(userID)
      if (!findCandidate) {
        throw new Error('Candidate not found, Please try again')
      }
    
      
      // If the candidate exist it will rehydrate and convert to toDTO object
      const rehydrateCandidate = this.candidateEntity
        .rehydrate(findCandidate)
        .toDTO()
        console.log(rehydrateCandidate);
         
        
    //   const deletedAllDocument =
    //     await this.candidateRepository.deletedAllByUserId(rehydrateCandidate.id)
    //   if (!deletedAllDocument) {
    //     throw new Error('Not removed any documents related to the candidate')
    //   }
      const deleteCandidate = await this.candidateRepository.deleteById(
        rehydrateCandidate.id
      )
      if (!deleteCandidate) {
        throw new Error('The candidate data not removed')
      }
   
      
    return deleteCandidate
    } catch (error) {
        console.log(error);
        
        throw new Error(error.message);
        
    }
  }
}

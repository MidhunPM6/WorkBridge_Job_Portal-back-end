export default class FetchProfieUseCase {
  constructor (profileRepository, profileEntity,candiadateRepository) {
    this.profileRepository = profileRepository
    this.profileEntity = profileEntity
    this.candiadateRepository =candiadateRepository
  }

  async execute (userID) {
    if (!userID) {
      throw new Error('User ID not recevied')
    }
    try {  
       const User =  await this.candiadateRepository.findByID(userID)

        
      const getProfile = await this.profileRepository.findByID(userID)
      if (!getProfile) {
        throw new Error('Profile data not found, Add your data')
      }
      const rehydratedData = this.profileEntity.rehydrate(getProfile).toDTO()
      const fullData = {
        ...rehydratedData,
        ...User
      }
      return fullData
             
      
    } catch (error) {
      throw new Error(error.message)
    }
  }
}

export default class fetchCompanyProfileUseCase {
  constructor (companyProfileRepository, companyProfileEntity) {
    this.companyProfileRepository = companyProfileRepository
    this.companyProfileEntity = companyProfileEntity
  }

  async execute (userID) {
    if (!userID) {
      throw new Error('User ID not recevied.Try agin later.')
    }
    try {
      const profile = await this.companyProfileRepository.findById(userID)
      if (!profile) {
        return null
      }
      const data = this.companyProfileEntity.rehydrate(profile).toDTO()  
      if (!data) {
        throw new Error('Data not found.Try again later.')
      }
      return data
    } catch (error) {
      console.info(error.message)
      throw new Error(error.message)
    }
  }
} 
   
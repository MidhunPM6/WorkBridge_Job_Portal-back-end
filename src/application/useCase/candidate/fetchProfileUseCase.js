export default class FetchProfieUseCase {
  constructor (profileRepository, profileEntity) {
    this.profileRepository = profileRepository
    this.profileEntity = profileEntity
  }

  async execute (userID) {
    if (!userID) {
      throw new Error('User ID not recevied')
    }
    try {
      const getProfile = await this.profileRepository.findByID(userID)
      if (!getProfile) {
        throw new Error('Profile data not found, Add your data')
      }
      const rehydratedData = this.profileEntity.rehydrate(getProfile).toDTO()
      return rehydratedData
    } catch (error) {
      throw new Error(error.message)
    }
  }
}

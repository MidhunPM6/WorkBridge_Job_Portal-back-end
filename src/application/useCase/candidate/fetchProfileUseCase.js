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
        throw new Error('The profile is not found with this id ')
      }
      const rehydratedData = this.profileEntity.rehydrate(getProfile).toDTO()
      console.log(rehydratedData)
      return rehydratedData
    } catch (error) {
      console.error(error.message)
      throw new Error(error.message)
    }
  }
}

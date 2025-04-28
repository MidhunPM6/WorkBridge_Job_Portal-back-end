export default class DeleteResumeUseCase {
  constructor (
    candidateRepository,
    profileRepository,
    profileEntity,
    candidateEntity
  ) {
    this.profileRepository = profileRepository
    this.candidateRepository = candidateRepository
    this.profileEntity = profileEntity
    this.candidateEntity = candidateEntity
  }

  async execute (userID) {
    // Find the user by ID
    try {
      const user = await this.candidateRepository.findByID(userID)
      if (!userID) {
        throw new Error('User not found')
      }
      // Rehydrate Data using the domain rule and convert it to ToDTO Object
      const rehydrateUser = this.candidateEntity.rehydrate(user).toDTO()

      // Check resume is existing in the user profile document
      const profile = await this.profileRepository.findByID(rehydrateUser.id)

      // Rehydrate the profile and convert to ToDTO Object.Once if find delete resume
      const rehydrateProfile = this.profileEntity.rehydrate(profile).toDTO()
      console.log(rehydrateProfile.resume)

      const deleteResume = await this.profileRepository.deleteResume(
        rehydrateProfile.id
      )
    
      return rehydrateProfile
    } catch (error) {
      throw new Error(error.message)
    }
  }
}

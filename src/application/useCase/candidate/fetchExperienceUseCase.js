export default class FetchExperienceUseCase {
  constructor (experienceRepository, experienceEntity) {
    this.experienceRepository = experienceRepository
    this.experienceEntity = experienceEntity
  }
  async execute (data) {
    if (!data) {
      throw new Error('User ID is mandatory')
    }
    try {
      //  Checking database with user ID ref.If experience exist it will return
      const getExperience = await this.experienceRepository.getByUserId(data)
      if (!getExperience) {
        throw new Error('No such experience found')
      }

      //  Rehydrate the feched data
      const rehydrateData = Array.isArray(getExperience)
        ? getExperience.map(data => this.experienceEntity.rehydrate(data))
        : this.experienceEntity.rehydrate(getExperience)

      // Convert the rehydrated data to DTO object and return
      const toDTOObj = Array.isArray(rehydrateData)
        ? rehydrateData.map(data => data.toDTO())
        : rehydrateData.toDTO()

      return toDTOObj
    } catch (error) {
      console.error(error.message)
      throw new Error(error.message)
    }
  }
}

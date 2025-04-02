export default class FetchExperienceUseCase {
  constructor (experienceRepository) {
    this.experienceRepository = experienceRepository
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
      return getExperience
    } catch (error) {
      console.error(error.message)
      throw new Error(error.message)
    }
  }
}

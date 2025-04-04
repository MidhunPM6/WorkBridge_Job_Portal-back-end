export default class ExperienceUseCase {
  constructor (experienceEntity, experienceRepository) {
    this.experienceEntity = experienceEntity
    this.experienceRepository = experienceRepository
  }
  async execute (data, userID) {
    //  Checking the user Data and userID
    if (!data) {
      throw new Error('Data not found')
    }
    if (!userID) {
      throw new Error('User ID is required and must be valid.')
    }

    try {
      // Checking with Entity and retrive DTO object,then save to database
      const experienceData = { ...data, userID }
      const experienceEntityObj = this.experienceEntity.create(experienceData)

      const experienceDTO = experienceEntityObj.toDTO() // Convert to DTO object
      console.log(experienceDTO)

      const addedData = await this.experienceRepository.create(experienceDTO)
      if(!addedData){
        throw new Error("Data not saved ,Something went wrong");
        
      }
      return addedData // return the saved data to controller 
    } catch (error) {
      console.error(error.message)
      throw new Error(error.message)
    }
  }
}

export default class EducationUseCase {
  constructor (educationRepository, educationEntity) {
    this.educationRepository = educationRepository
    this.educationEntity = educationEntity
  }
  async execute (data) {
    //  Check the data from the controller is null
    if (!data) {
      throw new Error('Data is missing or invalid please check')
    }
    try {
      
      //  Create the object by passing through Entity
      const educationEntityObj = this.educationEntity.create(data)
      const educationDTO = educationEntityObj.toDTO() // Convert to DTO object
      const savedData = await this.educationRepository.create(educationDTO) // Save the data into database
      if (!savedData) {
        throw new Error('Something went wrong, Data not saved ')
      }
      return savedData // retrun the saved data from the database
    } catch (error) {
      console.error(error.message)
      throw new Error(error.message)
    }
  }
}

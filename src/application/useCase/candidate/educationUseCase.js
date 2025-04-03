export default class EducationUseCase {
  constructor (educationRepository, educationEntity) {
    this.educationRepository = educationRepository
    this.educationEntity = educationEntity
  }
  async execute (data) {
    if (!data) {
      throw new Error('Data is missing or invalid please check')
    }
    try {
      const educationEntityObj = this.educationEntity.create(data)
      const educationDTO = educationEntityObj.toDTO()
      const savedData = await this.educationRepository.create(educationDTO)
      if (!savedData) {
        throw new Error('Something went wrong, Data not saved ')
      }
      return savedData
    } catch (error) {
      console.error(error.message)
      throw new Error(Error.message)
    }
  }
}

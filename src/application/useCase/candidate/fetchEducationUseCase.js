export default class FetchEducationUseCase {
  constructor (educationRepository, educationEntity) {
    this.educationRepository = educationRepository
    this.educationEntity = educationEntity
  }

  async execute (userID) {
    if (!userID) {
      throw new Error('Check the user ID valid or not') // checking the user id is valid 
    }
    try {
      // Getting the education data from the database collection
      const getEducation = await this.educationRepository.getByUserId(userID)
      if (!getEducation) {
        throw new Error('Not find any education data for this account')
      }

      //   Check with Rehydration in entity
      const rehydratedData = Array.isArray(getEducation)
        ? getEducation.map(data => this.educationEntity.rehydrate(data))
        : this.educationEntity.rehydrate(getEducation)
      //   Convert the rehydrated obj to DTO object and return it
      const toDTOObj = Array.isArray(rehydratedData)
        ? rehydratedData.map(data => data.toDTO())
        : rehydratedData.toDTO()
      return toDTOObj

    } catch (error) {
      console.error(error.message)
      throw new Error(error.message)
    }
  }
}

export default class FetchEducationUseCase {
  constructor (educationRepository) {
    this.educationRepository = educationRepository
  }

  async execute (userID) {
    if (!userID) {
      throw new Error('Check the user ID valid or not') // checking the user id valid or not
    }
    try {
      // Getting the education data from the database collection
      const getEducation = await this.educationRepository.getByUserId(userID)
      console.log(getEducation);
      
      if (!getEducation) {
        throw new Error('Not find any education data for this account')
      }
      return getEducation
    } catch (error) {
      console.error(error.message)
      throw new Error(error.message)
    }
  }
}

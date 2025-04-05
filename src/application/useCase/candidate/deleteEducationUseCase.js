export default class DeleteEducationUseCase {
  constructor (educationRepository) {
    this.educationRepository = educationRepository
  }
  async execute (eduID) {
    // checking the document is existing with this ID
    if (!eduID) {
      throw new Error('The education ID not Recevied')
    }
    try {
      // Once the document is find it will return
      const deletedData = await this.educationRepository.deleteById(eduID)
      if (!deletedData) {
        throw new Error('Not found data by this ID ')
      }
      return deletedData
    } catch (error) {
      console.log(error.message)
      throw new Error(error.message)
    }
  }
}

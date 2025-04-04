export default class DeleteExperienceUseCase {
  constructor (experienceRepository) {
    this.experienceRepository = experienceRepository
  }
  async execute (expID) {
    // Not recevied ID it will throw an error
    if (!expID) {
      throw new Error('Experience ID not recevied')
    }

    try {
      // Delete the data if it exists
      const deletedData = await this.experienceRepository.deleteById(expID)
      if (!deletedData) {
        throw new Error('No such data found with this ID')
      }
      console.log(deletedData);
      
      return deletedData // Return the deleted Document
    } catch (error) {
      console.error(error.message)
      throw new Error(error.message)
    }
  }
}

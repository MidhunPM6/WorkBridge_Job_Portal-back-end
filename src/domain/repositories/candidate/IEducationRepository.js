export default class IEducationRepository {
  async create (educationEntity) {
    throw new Error('The method create is required')
  }
  async getByUserId (userID) {
    throw new Error('The method getByUserId required')
  }
  async deleteById(educationId){
    throw new Error("The method deleteById");
  }

  
}

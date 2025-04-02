export default class IExperienceRepository {
  async create (experienceEntity) {
    throw new Error('The method create is required  ')
  }
  async getByUserId(userID){
      throw new Error("The method getByUserId is required");
      
  }
}

export default class IProfileRepository {
  async create (profileEntity) {
    throw new Error('The method create is required')
  }
  async findByID (profileEntity) {
    throw new Error('The method findByID not created')
  }
   async updateById(userID,updatedData){
      throw new Error("The method updateById not created");
   }
      
   fetchAllProfiles(){
      throw new Error("The method fetchAllProfiles not created");
   }
}

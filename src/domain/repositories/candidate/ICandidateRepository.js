export default class ICandidateRepository {
  async create (candidateEntity) {
    throw new Error('createUser Method not implemented')
  }

  async findByEmail (candidateEntity) {
    throw new Error('findByEmail Method not implemented')
  }
  async updateByEmail (candidateEntity) {
    throw new Error('updateByEmail Method not implemented')
  } 
  async findByID(candidateEntity){
    throw new Error("findByID Method is not implemented");
    
  }
  async updateByID(candidateEntity){
    throw new Error("updateByID Method is not implemented");
   }
   async deleteById(userID){
    throw new Error("deleteById Method is not implemented");
    
   }
   async deletedAllByUserId(userID){
    throw new Error("deletedAllByUserId Method is not implemented");
   }

}

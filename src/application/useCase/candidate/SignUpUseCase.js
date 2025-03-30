import CandidateEntity from '../../../domain/entities/canditate/CandidateEntity.js'

export default class SignInUseCase {
  constructor (candidateRepository,passwordServices,candidateEntity) {
    this.candidateRepository = candidateRepository
    this.passwordServices= passwordServices
    this.candidateEntity=candidateEntity
  }
  execute = async (name,email,password) => {
    try {
      // Checking the existing user
      const existingUser = await this.candidateRepository.findByEmail(email)

      if (existingUser) {
        return {
          message: 'User already exists',
          user : existingUser,
        }
      }
      
       const hashedPassword=await this.passwordServices.hash(password)
       console.log(hashedPassword)

      //Creating new user 
      const candidateEntity = this.candidateEntity.create({name,email,password:hashedPassword})
      const newUser = await this.candidateRepository.create(candidateEntity.toDTO())
      console.log(newUser);
      

      return {
        success: true,
        newUser,
        message: 'User successfully registered'
      }
    } catch (error) {
      throw new Error(error.message)
    }
  }
}

import CandidateEntity from '../../../domain/entities/canditate/CandidateEntity.js'

export default class SignInUseCase {
  constructor (candidateRepository) {
    this.candidateRepository = candidateRepository
  }
  execute = async data => {
    try {
      // Checking the existing user
      const existingUser = await this.candidateRepository.findByEmail(data.email)

      if (existingUser) {
        return {
          message: 'User already exists',
          user : existingUser,
        }
      }

      //Creating new user 
      const candidateEntity = CandidateEntity.create(data)
      const newUser = await this.candidateRepository.create(candidateEntity)

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

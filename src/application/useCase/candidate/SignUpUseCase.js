import CandidateEntity from '../../../domain/entities/canditate/CandidateEntity.js'

export default class SignInUseCase {
  constructor (candidateRepository) {
    this.candidateRepository = candidateRepository
  }
  excute = async data => {
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
      const candidateEntity = new CandidateEntity(data)
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

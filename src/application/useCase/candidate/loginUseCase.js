import { generateToken } from '../../../infrastucture/services/jwtService.js'
import { comparePassword } from '../../../infrastucture/services/passwordfService.js'

export default class LoginUseCase {
  constructor (candidateRepository,generateToken) {
    this.candidateRepository = candidateRepository
    this.generateToken = generateToken
  }
  async execute (data) {
    console.log(data.email)
    try {
      const candidate = await this.candidateRepository.findByEmail(data.email)
      console.log(candidate)
      if (!candidate) {
        throw new Error('Invalid Username or Password ')
      }

      //   Comparing the password from request
      const isPasswordValid = await comparePassword(
        data.password,
        candidate.password
      )

      if (!isPasswordValid) {
        throw new Error('Password Invalid')
      }

      const token = this.generateToken(candidate._id)

      return {
        token,
        candidate
      }
    } catch (error) {
      console.error(error)
      throw new Error("Something went wrong");
      
    }
  }
}

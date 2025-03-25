

export default class LoginUseCase {
  constructor (candidateRepository, passwordServices,tokenService) {
    this.candidateRepository = candidateRepository
    this.passwordServices = passwordServices
    this.tokenService = tokenService
    
  }
  async execute (email,password) {
     console.log(email);
     
    try {
      const candidate = await this.candidateRepository.findByEmail(email)
      if (!candidate) {
        throw new Error('Invalid Username or Password ')
      }
      console.log(candidate);
      //   Comparing the password
      const isPasswordValid = await this.passwordServices.comparePassword(
        password,
        candidate.password
      )

      if (!isPasswordValid) {
        throw new Error('Password Invalid')
      }
     
      
      const token = await this.tokenService.generateToken(candidate._id)

      return {
        token,
        candidate
      }
    } catch (error) {
      console.error(error)
      throw new Error('Something went wrong')
    }
  }
}

export default class LoginUseCase {
  constructor (candidateRepository, passwordServices, tokenService) {
    this.candidateRepository = candidateRepository
    this.passwordServices = passwordServices
    this.tokenService = tokenService
  }
  async execute (email, password) {
    try {
      //  Checking the user exist with the email id or not
      const user = await this.candidateRepository.findByEmail(email)
      if (!user) {
        throw new Error('Invalid Username or Password ')
      }
      // job role is not equal throw error
      
      
      //   Comparing the password
      const isPasswordValid = await this.passwordServices.comparePassword(
        password,
        user.password
      )
      if (!isPasswordValid) {
        throw new Error('Invalid Password')
      }
      const token = await this.tokenService.generateToken(user) // if the password is correct it will generate Token
      return {
        token,
        user
      }
    } catch (error) {
      console.error(error)
      throw new Error(error.message)
    }
  }
}

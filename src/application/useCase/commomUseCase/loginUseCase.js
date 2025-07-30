export default class LoginUseCase {
  constructor (
    candidateRepository,
    passwordServices,
    tokenService,
    employerRepository
  ) {
    this.candidateRepository = candidateRepository
    this.passwordServices = passwordServices
    this.tokenService = tokenService
    this.employerRepository = employerRepository
  }
  async execute (email, password, role) {
    try {
      //  Checking the user exist with the email id or not
      let account
      if (role === 'candidate') {
        account = await this.candidateRepository.findByEmail(email)
      } else if (role === 'employer') {
       account = await this.employerRepository.findByEmail(email)
      } else {
      throw new Error("'Invalid role specified'");
     
      }
      //   If user not found throw an error
      if (!account) {
        throw new Error('Invalid Username or Password ')
      }
      //   Comparing the password
      const isPasswordValid = await this.passwordServices.comparePassword(
        password,
        account.password
      )
      if (!isPasswordValid) {
        throw new Error('Invalid Password')
      }
      const token = await this.tokenService.generateToken(account) // if the password is correct it will generate Token
      return {
        token,
        account
      }
    } catch (error) {
      console.error(error.message)
      throw new Error(error.message)
    }
  }
}

export default class SignInUseCase {
  constructor (candidateRepository, passwordServices, candidateEntity) {
    this.candidateRepository = candidateRepository
    this.passwordServices = passwordServices
    this.candidateEntity = candidateEntity
  }
  execute = async (name, email, password, role) => {
    

    try {
      // Checking the existing user
      const existingUser = await this.candidateRepository.findByEmail(email)

      if (existingUser) {
        return {
          message: 'User already exists',
          user: existingUser
        }
      }

      const hashedPassword = await this.passwordServices.hash(password)
      

      //Creating new user
      const candidateEntity = this.candidateEntity.create({
        name,
        email,
        password: hashedPassword,
        role
      })
      console.log(candidateEntity)
      const newUser = await this.candidateRepository.create(
        candidateEntity.toDTO()
      )

      return {
        success: true,
        newUser,
        message: 'User successfully registered'
      }
    } catch (error) {
      throw new Error(error)
    }
  }
}

export default class SignInUseCase {
  constructor (
    candidateRepository,
    passwordServices,
    candidateEntity,
    employerRepository,
    employerEntity
  ) {
    this.candidateRepository = candidateRepository
    this.passwordServices = passwordServices
    this.candidateEntity = candidateEntity
    this.employerRepository = employerRepository
    this.employerEntity = employerEntity
  }
  execute = async (name, email, password, role) => {
    
    try {
      // Checking the existing user
      if (role === 'candidate') {
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
          message: ' Successfully registered'
        }
      } else if (role === 'employer') {
        const existingUser = await this.employerRepository.findByEmail(email)

        if (existingUser) {
          return {
            message: 'User already exists'
          }
        }

        const hashedPassword = await this.passwordServices.hash(password)

        const employerEntity = this.employerEntity.create({
          name,
          email,
          password: hashedPassword,
          role
        })
        console.log(employerEntity)
        const newUser = await this.employerRepository.create(
          employerEntity.toDTO()
        )

        return {
          success: true,
          newUser,
          message: ' Successfully registered'
        }
      }
    } catch (error) {
      throw new Error(error)
    }
  }
}

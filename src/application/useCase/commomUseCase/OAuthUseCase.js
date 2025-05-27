export default class OAuthUseCase {
  constructor (
    OauthService,
    candidateRepository,
    candidateEntity,
    tokenService,
    employerRepository,
    employerEntity
  ) {
    this.OauthService = OauthService
    this.candidateRepository = candidateRepository
    this.candidateEntity = candidateEntity
    this.tokenService = tokenService
    this.employerRepository = employerRepository
    this.employerEntity = employerEntity
  }

  async execute (code, codeVerifier, role) {
    try {
      if (!code || !codeVerifier || !role) {
        throw new Error('Code, codeVerifier, and role are missing')
      }

      // Fetch Google user from OAuth service
      const googleUser = await this.OauthService.handleOAuth(code, codeVerifier)
      if (!googleUser) {
        throw new Error('Failed to retrieve user info')
      }

      const { email, name, picture } = googleUser.user

      // Set repository and entity based on the role
      let repository, entity, User

      if (role === 'candidate') {
        repository = this.candidateRepository
        entity = this.candidateEntity
      } else if (role === 'employer') {
        repository = this.employerRepository
        entity = this.employerEntity
      } else {
        throw new Error('Invalid role specified')
      }

      // Check if the user exists in the repository
      User = await repository.findByEmail(email)

      if (User) {
        // If user exists, update with the current data from OAuth
        const updateData = {
          email,
          name,
          profilePic: picture,
          role
        }
        const updateUser = entity.createPartial(updateData)
        const toDTOUser = updateUser.toDTO()
        await repository.updateByEmail(toDTOUser.email, toDTOUser)
      } else {
        // If user doesn't exist, create a new user in the database
        const newEntity = await entity.create({
          email,
          name,
          profilePic: picture,
          role
        })
        const toDTOUser = await newEntity.toDTO()
        User = await repository.create(toDTOUser)
      }

      // Generate a token for the user and save it in an httpOnly cookie
      const token = await this.tokenService.generateToken(User)

      return {
        token,
        User
      }
    } catch (error) {
      console.error(error)
      throw new Error('Server error or data not found')
    }
  }
}

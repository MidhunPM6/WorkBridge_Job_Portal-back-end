

export default class OAuthUseCase {
  constructor (OauthService, candidateRepository,candidateEntity,tokenService) {
    this.candidateRepository = candidateRepository
    this.OauthService = OauthService
    this.candidateEntity=candidateEntity
    this.tokenService = tokenService
    
  }
  async execute (code, codeVerifier) {
    try {
      // Fetching google user from the OAuth Service
      if (!code || !codeVerifier) {
        throw new Error('Code and codeVerifier is missing')
      }
      const googleUser = await this.OauthService.handleOAuth(code, codeVerifier)
      if (!googleUser) {
        throw new Error('Failed to retrive user info')
      }
      console.log(googleUser);
      
      const { email, name ,picture} = googleUser.user
      let User = await this.candidateRepository.findByEmail(email) 

      //  If existing user, update with the current data from OAuth
      if (User) {
        const updateData = {
          email: email,
          name: name,
          profilePic : picture
        }
        const updateUser = this.candidateEntity.createPartial(updateData)
        const toDTOUser = updateUser.toDTO()
        await this.candidateRepository.updateByEmail(toDTOUser.email, toDTOUser)
      } else {
        // User not exist create a new user in db
        const candidateEntity = this.candidateEntity.create({ email, name }) 
        const user = this.candidateEntity.toDTO()

        User = await this.candidateRepository.create(user)
      } 

      //  Generate token for the user and saved in httpOnly cookie
      const token = await this.tokenService.generateToken(User._id)
      return {
        success: true,
        user: User,
        jwtToken: token
      }
    } catch (error) { 
      console.error(error)
      throw new Error('Server Error or Data not found')
    }
  }
}

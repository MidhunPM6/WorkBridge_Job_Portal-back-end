import CandidateEntity from '../../../domain/entities/canditate/CandidateEntity.js'

export default class OAuthUseCase {
  constructor (handleOAuthServices, candidateRepository) {
    this.candidateRepository = candidateRepository
    this.handleOAuthServices = handleOAuthServices
    
  }
  async execute (code, codeVerifier) {
    try {
      // Fetching the google user from the OAuth Service
      if (!code || !codeVerifier) {
        throw new Error('Code and codeVerifier is missing')
      }
      const googleUser = await this.handleOAuthServices(code, codeVerifier)
      if (!googleUser) {
        throw new Error('Failed to retrive user info')
      }
      console.log(googleUser);
      
      const { email, name ,picture} = googleUser.user
      let User = await this.candidateRepository.findByEmail(email)

      //  If existing user, update with current data from OAuth
      if (User) {
        const updateData = {
          email: email,
          name: name,
          profilePic : picture
        }
        const updateUser = CandidateEntity.createPartial(updateData)
        const toDTOUser = updateUser.toDTO()
        await this.candidateRepository.updateByEmail(toDTOUser.email, toDTOUser)
      } else {
        // User not exist create a new user in db
        const candidateEntity = CandidateEntity.create({ email, name }) 
        const user = candidateEntity.toDTO()

        User = await this.candidateRepository.create(user)
      } 

      //  Generate token for the user  through httpOnly cookie
      const token = await this.generateToken(User._id)
      console.log('JWT' + token)
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

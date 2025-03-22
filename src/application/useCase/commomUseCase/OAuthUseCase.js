import CandidateEntity from '../../../domain/entities/canditate/CandidateEntity.js'

export default class OAuthUseCase {
  constructor (handleOAuthServices, candidateRepository, generateToken) {
    this.candidateRepository = candidateRepository
    this.handleOAuthServices = handleOAuthServices
    this.generateToken = generateToken
  }
  async execute (code, codeVerifier) {
    try {
      if (!code || !codeVerifier) {
        throw new Error('Code and codeVerifier is missing')
      }
      const googleUser = await this.handleOAuthServices(code, codeVerifier)
      if (!googleUser) {
        throw new Error('Failed to retrive user info')
      }
      const { email,name } = googleUser.user
      console.log(email)
      

      let User = await this.candidateRepository.findByEmail(email)

      if (User) {
          User.email =email;
          User.name = name;
          await this.candidateRepository.updateByEmail(email,User)
      } else {
        const candidateEntity = new CandidateEntity({email,name})

         User = await this.candidateRepository.create(candidateEntity)
      }

      const token =  await this.generateToken(User._id)
      console.log("JWT" + token  )



      return {
        success: true,
        user: User,
        jwtToken :token
      }
    } catch (error) {
        console.error(error);
        
    }
  }
}

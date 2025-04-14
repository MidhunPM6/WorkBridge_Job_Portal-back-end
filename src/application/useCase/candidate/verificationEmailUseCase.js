export default class VerificationEmailUseCase {
  constructor (candidateRepository, emailOtpService, otpRepository) {
    this.candidateRepository = candidateRepository
    this.emailOtpService = emailOtpService
    this.otpRepository = otpRepository
  }

  async execute (email) {
    if (!email) {
      throw new Error('Email must be required...')
    }
    try {
      const candidate = await this.candidateRepository.findByEmail(email)
      if (!candidate) {
        throw new Error('The candidate is not existing with this email')
      }
      //  Genarate a random code for OTP, which is a 6 digit number
      const code = Math.floor(100000 + Math.random() * 900000)
      const generateEmailCode = this.emailOtpService.sendVerificationEmail(
        email,
        code
      )
      if (!generateEmailCode) {
        throw new Error('Verification code not procced ,Please check again ')
      }
    //   Hash the code and save to the database 
      const hashCode = await this.emailOtpService.hashing(code)
      const saveCode = await this.otpRepository.create( {email,otp: hashCode} )
      return saveCode
    } catch (error) { 
        console.error(error);
     throw new Error(error.message);
     
        
    }
  }

}

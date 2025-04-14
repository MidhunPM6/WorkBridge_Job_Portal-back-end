export default class VerificationEmailUseCase {
  constructor (
    candidateRepository,
    emailOtpService,
    otpRepository,
    passwordService,
    candidateEntity
  ) {
    this.candidateRepository = candidateRepository
    this.emailOtpService = emailOtpService
    this.otpRepository = otpRepository
    this.passwordService = passwordService
    this.candidateEntity = candidateEntity
  }

  async execute (email, password) {
    if (!email) {
      throw new Error('Email must be required...')
    }

    try {
      const candidate = await this.candidateRepository.findByEmail(email)
      if (!candidate) {
        throw new Error('The candidate is not existing with this email')
      }
      const passwordIsValid = await this.passwordService.comparePassword(
        password,
        candidate.password
      )
      if (!passwordIsValid) {
        throw new Error(
          'The password is incorrect, Please check with another one'
        )
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
      const findEmail = await this.otpRepository.findByEmail(email)
      if (findEmail) {
        const updateCode = await this.otpRepository.updateByEmail(
          email,
          hashCode
        )
        return updateCode
      } else if (!findEmail) {
        const saveCode = await this.otpRepository.create({
          email,
          otp: hashCode
        })
        return saveCode
      }
      return saveCode
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async verifyOtpAndUpdate (email, verificationCode, newPassword) {
    console.log(verificationCode)
       
    try {
      const findCode = await this.otpRepository.findByEmail(email)
      if (!findCode) {
        throw new Error('Not find any code from the email')
      }

      const compareCode = await this.passwordService.comparePassword(
        verificationCode.toString(),
        findCode.otp
      )
      if (!compareCode) {
        throw new Error('Entered invalid otp')
      }

      const hashNewPassword = await this.passwordService.hash(newPassword)
      const upadateEntity = this.candidateEntity
        .createPartial({ password: hashNewPassword })
        .toDTO()
      const upadateCandidate = await this.candidateRepository.updateByEmail(
        email,
        upadateEntity
      )
      return upadateCandidate
    } catch (error) {
      console.log(error)

      throw new Error(error.message)
    }
  }
}

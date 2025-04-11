export default class ChangeNameUseCase {
  constructor (candidateRepository, passwordService, candidateEntity) {
    this.candidateRepository = candidateRepository
    this.passwordService = passwordService
    this.candidateEntity = candidateEntity
  }
  async execute (data) {
    if (!data) {
      throw new Error('Provide a data, Not found any data ')
    }
    try {
      // Find the user from the given User ID
      const Candidate = await this.candidateRepository.findByID(data.userID)
      if (!Candidate) {
        throw new Error('Not found any candidate with this ID')
      }
      const candidateRehydrate = this.candidateEntity
        .rehydrate(Candidate)
        .toDTO()
      console.log(candidateRehydrate)

      // Compare the password with rehydrated candidate
      const passwordIsValid = await this.passwordService.comparePassword(
        data.password,
        candidateRehydrate.password
      )
      if (!passwordIsValid) {
        throw new Error('The password is invalid.')
      }
      // Check the given data with candidate entity and convert to toDTO object, then update the candidate document
      const toDTOUsername = this.candidateEntity
        .createPartial({ name: data.name })
        .toDTO()

      const updatedUsername = await this.candidateRepository.updateByID(
        data.userID,
        toDTOUsername
      )
      return updatedUsername
    } catch (error) {
      console.error(error)
      throw new Error(error.message)
    }
  }
}

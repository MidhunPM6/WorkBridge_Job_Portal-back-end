export default class CompanyProfileUseCase {
  constructor (companyProfileRepository, companyProfileEntity) {
    this.companyProfileRepository = companyProfileRepository
    this.companyProfileEntity = companyProfileEntity
  }

  async execute (employerData) {
    try {
      if (!employerData) {
        throw new Error('Data not found.Try again later.')
      }
      const existingProfile = await this.companyProfileRepository.findById(
        employerData.userID
      )
 
      if (!existingProfile) {
        const profileEntity = this.companyProfileEntity
          .createPartial(employerData)
          .toDTO()
          console.log(profileEntity);
          
        const createNewProfile = await this.companyProfileRepository.create(
          profileEntity
        )
        return createNewProfile
      }

      const profileEntity = this.companyProfileEntity
        .createPartial(employerData)
        .toDTO()
      const updatedData = this.companyProfileRepository.updateById(
        profileEntity.userID,
        profileEntity
      )

      return updatedData
    } catch (error) {
      console.error(error)
      throw new Error(error.message)
    }
  }
}

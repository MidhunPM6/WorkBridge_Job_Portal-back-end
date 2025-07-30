export default class GetCandidateUseCase {
  constructor (profileRepository, profileEntity) {
    this.profileRepository = profileRepository
    this.profileEntity = profileEntity
  }

  async execute () {
    try {
      const findCandidates = await this.profileRepository.findAllCandidates()
      if (!findCandidates) {
        throw new Error('Not found any data ')
      }
      const toDTOObj = findCandidates.map(candidate =>
        this.profileEntity.rehydrate(candidate).toDTO()
      )
   
      return toDTOObj
    } catch (error) {
      console.error(error)

      throw new Error(error.message)
    }
  }
}

export default class FetchCandidateDataUseCase {
    constructor(profileRepository,profileEntity) {
        this.profileRepository = profileRepository
        this.profileEntity = profileEntity
    }

      async execute() {
        try {
            const candidateData = await this.profileRepository.findAllProfiles()
            if (!candidateData) {
                throw new Error('Employer not found')
            }
            return candidateData
        } catch (error) {
            throw new Error(error.message)
        }
    }
}

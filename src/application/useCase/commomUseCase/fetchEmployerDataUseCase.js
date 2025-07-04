export default class FetchEmployerDataUseCase {
    constructor(compnayRepository,compnayEntity) {
        this.employerRepository = compnayRepository
        this.employerEntity = compnayEntity
        
    }

    async execute() {
        try {
            const employerData = await this.employerRepository.findAllProfiles()
            if (!employerData) {
                throw new Error('Employer not found')
            }
            return employerData
        } catch (error) {
            throw new Error(error.message)
        }
    }
}
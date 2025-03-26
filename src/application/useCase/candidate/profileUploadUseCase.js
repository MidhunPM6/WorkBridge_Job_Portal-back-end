import CandidateEntity from '../../../domain/entities/canditate/CandidateEntity.js'

export default class ProfileUploadUseCase {
  constructor (candidateRepository, gcpStorageService,candidateEntity) {
    this.candidateRepository = candidateRepository
    this.gcpStorageService = gcpStorageService
    this.candidateEntity = candidateEntity
  }
  async execute ({ file, userID }) {
    try {
      //  Getting the SignedURL from the GCP service
      const uploadFile = await this.gcpStorageService.uploadToGCP(file)

      if (!uploadFile) {
        throw new Error('Signed URL not found. ')
      }
      const fileUpload = this.candidateEntity.createPartial({
        profilePic: uploadFile
      })
      const dtoObject = fileUpload.toDTO()

      //  Find the Candidate from the given ID
      const candidateData = await this.candidateRepository.findByID(userID)

      if (!candidateData) {
        throw new Error('Candidate not found. Please try again. ')
      }
      const rehydrateCandidate = this.candidateEntity.rehydrate(candidateData)
      const candidateDataDTO = rehydrateCandidate.toDTO()

      //  Update the user with signedURL and return
      const updatedProfilePic = await this.candidateRepository.updateByID(
        candidateDataDTO.id,
        dtoObject
      )
      return updatedProfilePic 

    } catch (error) {
      console.error(error)
      throw new Error('File upload failed ')
    }
  }
}

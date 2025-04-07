export default class ProfileUploadUseCase {
  constructor (candidateRepository, gcpStorageService, candidateEntity) {
    this.candidateRepository = candidateRepository
    this.gcpStorageService = gcpStorageService
    this.candidateEntity = candidateEntity
  }
  async execute ({ file, userID, fileType }) {
    try {
      let destination
      switch (fileType) {
        case 'profilepic':
          destination = `profilepic/${Date.now()}_${file.originalname}`
          break
        case 'profilecover':
          destination = `profilecover/${Date.now()}_${file.originalname}`
          break
        default:
          destination = `others/${Date.now()}_${file.originalname}`
          break
      }

      //  Getting the SignedURL from the GCP service and Validate with entity

      let dtoObject

      if (fileType === 'profilepic') {
        const uploadProfilePic = await this.gcpStorageService.uploadToGCP(
          file,
          destination
        )
        const picUpload = this.candidateEntity.createPartial({
          profilePic: uploadProfilePic
        })
        dtoObject = picUpload.toDTO()
      }

      if (fileType === 'profilecover') {
        const uploadProfileCover = await this.gcpStorageService.uploadToGCP(
          file,
          destination
        )
        const coverUpload = this.candidateEntity.createPartial({
          profileCoverPic: uploadProfileCover
        })
        dtoObject = coverUpload.toDTO()
      }

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

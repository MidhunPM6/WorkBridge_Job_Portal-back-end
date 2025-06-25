export default class ProfileUploadUseCase {
  constructor (
    candidateRepository,
    gcpStorageService,
    candidateEntity,
    employerRepository,
    employerEntity
  ) {
    this.candidateRepository = candidateRepository
    this.gcpStorageService = gcpStorageService
    this.candidateEntity = candidateEntity
    this.employerRepository = employerRepository
    this.employerEntity = employerEntity
  }
  async execute ({ file, userID, fileType, role }) {
   console.log(fileType, role);
   

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

      //  Getting the SignedURL from the GCP service and Validate with entity for both profilepic and profilecover
      //  Profilepic upload
      let dtoObject

      if (fileType === 'profilepic') {
        const uploadProfilePic = await this.gcpStorageService.uploadToGCP(
          file,
          destination
        )

        const entity =
          role === 'candidate' ? this.candidateEntity : this.employerEntity

        const picUpload = entity.createPartial({
          profilePic: uploadProfilePic
        })

        dtoObject = picUpload.toDTO()
      }

      // Profilecover upload
      if (fileType === 'profilecover') {
        const uploadProfileCover = await this.gcpStorageService.uploadToGCP(
          file,
          destination
        )

        const entity =
          role === 'candidate' ? this.candidateEntity : this.employerEntity

        const coverUpload = entity.createPartial({
          profileCoverPic: uploadProfileCover
        })

        dtoObject = coverUpload.toDTO()
      }

      //  Find the Candidate from the given ID
      let updatedProfilePic
      if (role === 'candidate') {
        console.log(dtoObject);
        
        const candidateData = await this.candidateRepository.findByID(userID)

        if (!candidateData) {
          throw new Error('Candidate not found. Please try again. ')
        }
        const rehydrateCandidate = this.candidateEntity.rehydrate(candidateData)
        const candidateDataDTO = rehydrateCandidate.toDTO()
        //  Update the user with signedURL and return
        updatedProfilePic = await this.candidateRepository.updateByID(
          candidateDataDTO.id,
          dtoObject
        )
        return updatedProfilePic
      }

      
      if (role === 'employer') {
        const employerData = await this.employerRepository.findByID(userID)

        if (!employerData) {
          throw new Error('Employer not found. Please try again. ')
        }
        const rehydrateEmployer = this.employerEntity.rehydrate(employerData)
        const employerDataDTO = rehydrateEmployer.toDTO()
        console.log('dtoObject before updateByID:', dtoObject)
        if (!dtoObject || typeof dtoObject !== 'object') {
          throw new Error('DTO object is invalid or undefined before update')
        }

        //  Update the user with signedURL and return
        updatedProfilePic = await this.employerRepository.updateByID(
          employerDataDTO.id,
          dtoObject
        )
        return updatedProfilePic
      }
    } catch (error) {
      console.error(error)
      throw new Error('File upload failed ')
    }
  }
}

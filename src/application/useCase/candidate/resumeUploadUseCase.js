export default class ResumeUploadUseCase {
  constructor (
    profileRepository,
    candidateRepository,
    profileEntity,
    gcpStorageService,
    candidateEntity
  ) {
    this.profileEntity = profileEntity
    this.profileRepository = profileRepository
    this.candidateRepository = candidateRepository
    this.gcpStorageService = gcpStorageService
    this.candidateEntity = candidateEntity
  }
  async execute (file, userID) {
    if (!file) {
      throw new Error('Resume not found, Please check again')
    }
    if (!userID) {
      throw new Error('User ID not found, please check again')
    }

    try {
      // Resume upload to cloud and return publicUrl
      let destination = `resumes/${Date.now()}_${file.originalname}`
      const publicUrl = await this.gcpStorageService.uploadToGCP(
        file,
        destination
      )
      console.log(publicUrl)

      // Save the public url to corresponding repository
      const profileEntityPartial = this.profileEntity
        .createPartial({ resume: publicUrl })
        
      console.info(profileEntityPartial)

      const uploadedResume = this.profileRepository.updateById(
        userID,
        profileEntityPartial
      )
      return uploadedResume
    } catch (error) {
      console.error(error.message) 
      throw new Error(error.message)
    }
  }
}

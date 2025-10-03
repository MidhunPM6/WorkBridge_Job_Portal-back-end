export default class ApplyJobUseCase {
  constructor (
    appliedJobRepository,
    profileRepository,
    applyEntity,
    educationRepository,
    experienceRepository
  ) {
    this.appliedJobRepository = appliedJobRepository
    this.profileRepository = profileRepository
    this.applyEntity = applyEntity
    this.educationRepository = educationRepository
    this.experienceRepository = experienceRepository
  }

  async execute (employerId, jobId, userID) {
    try {
      // Validate input
      if (!employerId || !jobId || !userID) {
        throw new Error(
          'Invalid input: employerId, jobId, and userID are required'
        )
      }
      console.log(employerId, jobId, userID)

      const isApplied = await this.appliedJobRepository.findById(jobId, userID)
      console.log(isApplied)

      // Check if the user has already applied for the job
      if (isApplied) {
        throw new Error(' Already applied for this job')
      }
      // Find the user profile by user ID
      const profile = await this.profileRepository.findByID(userID)

      const education = await this.educationRepository.getByUserId(userID)
      const experience = await this.experienceRepository.getByUserId(userID)

      if (education.length === 0 && experience.length === 0) {
        throw new Error(
          'Please add your education and experience before applying for a job'
        )
      }

      if (!profile) {
        throw new Error('Profile not found')
      }

      const educationIds = education.map(e => e._id)
      const experienceIds = experience.map(e => e._id)

      // Create the apply entity
      const applyEntity = this.applyEntity
        .create(
          employerId,
          jobId,
          userID,
          profile._id,
          educationIds,
          experienceIds,
        )
        .toDto()
      console.log(applyEntity)

      // Save the apply entity to the repository
      const savedApply = await this.appliedJobRepository.save(applyEntity,'pending')
      // Return the saved apply entity
      return savedApply
    } catch (error) {
      // Handle any errors that occur during the execution
      console.error('Error executing ApplyJobUseCase:', error)
      throw new Error(
        error.message || 'An error occurred while applying for the job'
      )
    }
  }
}

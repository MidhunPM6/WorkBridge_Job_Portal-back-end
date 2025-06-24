export default class FetchApplicationUseCase {
  constructor (appliedJobRepository) {
    this.appliedJobRepository = appliedJobRepository
  }
  async execute (employerId) {
    try {
      if (!employerId) {
        throw new Error('Employer ID is required')
      }

      const jobs = await this.appliedJobRepository.findByEmployerId(employerId)
      if (!jobs || jobs.length === 0) {
        return []
      }


      return {
        applicationData: jobs.map(job => {
          return {
            jobData: job.jobId,
            candidateData: job.userID,
            profileData: job.profileId,
            educationData: job.educationIds,
            experienceData: job.experienceIds,
            createdAt: job.createdAt,
            updatedAt: job.updatedAt
          }
        }),
      }  
      return job
    } catch (error) {
      console.error('Error fetching jobs:', error)
      throw new Error(error.message)
    }
  }
}

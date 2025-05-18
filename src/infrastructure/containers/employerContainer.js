import JobPostUseCase from '../../application/useCase/employer/jobPostUseCase.js'
import JobEntity from '../../domain/entities/employer/jobEntity.js'
import PostJobRepository from '../repositories/employer/JobPostRepository.js'

const employerContainer = () => {
  // Repositories

  const jobPostRepository = new PostJobRepository()
  const jobEntity = JobEntity

  return {
    // Job posting use cases
    postJobUseCase: new JobPostUseCase(jobPostRepository, jobEntity)
  }
}

export default employerContainer

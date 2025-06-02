import FetchAllJobsUseCase from '../../application/useCase/employer/fetchAllJobsUseCase.js'
import FetchMyJobsUseCase from '../../application/useCase/employer/fetchMyJobsUseCase.js'
import JobPostUseCase from '../../application/useCase/employer/jobPostUseCase.js'
import UpdateJobUseCase from '../../application/useCase/employer/updateJobUseCase.js'
import JobEntity from '../../domain/entities/employer/JobEntity.js'
import PostJobRepository from '../repositories/employer/JobPostRepository.js'



const employerContainer = () => {
  // Repositories

  const jobPostRepository = new PostJobRepository()
  const jobEntity = JobEntity

  return {
    // Job posting use cases
    postJobUseCase: new JobPostUseCase(jobPostRepository, jobEntity),
    fetchAllJobsUseCase: new FetchAllJobsUseCase(jobPostRepository, jobEntity),
    fetchMyJobsUseCase: new FetchMyJobsUseCase(jobPostRepository, jobEntity),
    updateJobUseCase: new UpdateJobUseCase(jobPostRepository, jobEntity)
  }
}

export default employerContainer

import FetchAllJobsUseCase from '../../application/useCase/employer/fetchAllJobsUseCase.js'
import FetchMyJobsUseCase from '../../application/useCase/employer/fetchMyJobsUseCase.js'
import JobPostUseCase from '../../application/useCase/employer/jobPostUseCase.js'
import UpdateJobUseCase from '../../application/useCase/employer/updateJobUseCase.js'
import JobEntity from '../../domain/entities/employer/JobEntity.js'
import PostJobRepository from '../repositories/employer/JobPostRepository.js'
import DeleteJobUseCase from '../../application/useCase/employer/deleteJobUseCase.js'
import CompanyProfileEntity from '../../domain/entities/employer/CompanyProfileEnitity.js'
import CompanyProfileRepository from '../repositories/employer/companyProfileRespository.js'
import CompanyProfileUseCase from '../../application/useCase/employer/companyProfileUseCase.js'
import FetchCompanyProfileUseCase from '../../application/useCase/employer/fetchCompanyProfileUseCase.js'
import JobApplyRepository from '../repositories/candidate/jobApplyRepository.js'
import FetchApplicationUseCase from '../../application/useCase/employer/fetchApplicationUseCase.js'
import GetCandidateUseCase from '../../application/useCase/employer/getCandidateUseCase.js'
import ProfileEntity from '../../domain/entities/candidate/ProfileEntity.js'
import ProfileRepository from '../repositories/candidate/profileRepository.js'







const employerContainer = () => {
  // Repositories

  const jobPostRepository = new PostJobRepository()
  const companyProfileRepository = new CompanyProfileRepository()
  const jobApplyRepository = new JobApplyRepository()
  const profileRepository = new ProfileRepository()
  const jobEntity = JobEntity
  const companyProfileEntity = CompanyProfileEntity
  const profileEntity = ProfileEntity

  return {
    // Job posting use cases
    postJobUseCase: new JobPostUseCase(jobPostRepository, jobEntity),
    fetchAllJobsUseCase: new FetchAllJobsUseCase(jobPostRepository, jobEntity),
    fetchMyJobsUseCase: new FetchMyJobsUseCase(jobPostRepository, jobEntity),
    updateJobUseCase: new UpdateJobUseCase(jobPostRepository, jobEntity),
    deleteJobUseCase: new DeleteJobUseCase(jobPostRepository, jobEntity),

    // Company profile use cases
    companyProfileUseCase: new CompanyProfileUseCase(companyProfileRepository, companyProfileEntity),
    fetchCompanyProfileUseCase: new FetchCompanyProfileUseCase(companyProfileRepository, companyProfileEntity),
    fetchApplicationsUseCase: new FetchApplicationUseCase(jobApplyRepository),
    getCandidateUseCase : new GetCandidateUseCase(profileRepository, profileEntity)
    
  }

}

export default employerContainer

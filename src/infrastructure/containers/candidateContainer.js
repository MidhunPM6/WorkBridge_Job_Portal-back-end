

import CandidateRepository from '../repositories/candidate/candidateRepository.js'
import GCPStorageService from '../services/gcpService.js'
import PasswordServices from '../services/passwordfService.js'
import TokenService from '../../infrastructure/services/jwtService.js'
import CandidateEntity from '../../domain/entities/candidate/CandidateEntity.js'
import ProfileUseCase from '../../application/useCase/candidate/profileUseCase.js'
import ProfileEntity from '../../domain/entities/candidate/ProfileEntity.js'
import ProfileRepository from '../repositories/candidate/profileRepository.js'
import ExperienceUseCase from '../../application/useCase/candidate/experienceUseCase.js'
import ExperienceEntity from '../../domain/entities/candidate/ExperienceEntity.js'
import ExperienceRepository from '../repositories/candidate/experienceRepository.js'
import FetchExperienceUseCase from '../../application/useCase/candidate/fetchExperienceUseCase.js'
import EducationUseCase from '../../application/useCase/candidate/educationUseCase.js'
import EducationEntity from '../../domain/entities/candidate/EducationEntity.js'
import EducationRepository from '../repositories/candidate/educationRepository.js'
import FetchEducationUseCase from '../../application/useCase/candidate/fetchEducationUseCase.js'
import DeleteExperienceUseCase from '../../application/useCase/candidate/deleteExperienceUseCase.js'
import DeleteEducationUseCase from '../../application/useCase/candidate/deleteEducationUseCase.js'
import FetchProfieUseCase from '../../application/useCase/candidate/fetchProfileUseCase.js'
import ResumeUploadUseCase from '../../application/useCase/candidate/resumeUploadUseCase.js'
import ChangeNameUseCase from '../../application/useCase/candidate/changeNameUseCase.js'
import OtpRepository from '../repositories/candidate/otpRepository.js'
import VerificationEmailUseCase from '../../application/useCase/candidate/verificationEmailUseCase.js'
import EmailOtpService from '../services/emailOtpService.js'
import DeleteAccountUseCase from '../../application/useCase/candidate/deleteAccountUsecase.js'
import DeleteResumeUseCase from '../../application/useCase/candidate/deleteResumeUseCase.js'
import ApplyJobUseCase from '../../application/useCase/candidate/applyJobUseCase.js'
import JobApplyRepository from '../repositories/candidate/jobApplyRepository.js'
import ApplyEntity from '../../domain/entities/candidate/ApplyEntity.js'
import AppliedJobUseCase from '../../application/useCase/candidate/appliedJobsUseCase.js'
import EmployerRepository from '../repositories/employer/employerRepository.js'
import EmployerEntity from '../../domain/entities/employer/EmployerEnitity.js'




  

const candidateContainer = () => {
  const candidateRepository = new CandidateRepository()
  const gcpStorageService = new GCPStorageService()
  const passwordServices = new PasswordServices()
  const profileRepository = new ProfileRepository()
  const experienceRepository = new ExperienceRepository()
  const educationRepository = new EducationRepository()
  const otpRepository = new OtpRepository()
  const emailOtpService = new EmailOtpService()
  const jobApplyRepository = new JobApplyRepository()
 
  const employerRepository = new EmployerRepository()

  const candidateEntity = CandidateEntity
  const profileEntity = ProfileEntity
  const experienceEntity = ExperienceEntity
  const educationEntity = EducationEntity
  const applyEntity = ApplyEntity
  const employerEntity = EmployerEntity
  

  return {
   

    
   

    profileUseCase: new ProfileUseCase(
      profileEntity,
      profileRepository,
      candidateRepository
    ),

    experienceUseCase: new ExperienceUseCase(
      experienceEntity,
      experienceRepository
    ),

    fetchExperienceUseCase: new FetchExperienceUseCase(
      experienceRepository,
      experienceEntity
    ),
    educationUseCase: new EducationUseCase(
      educationRepository,
      educationEntity
    ),
    fetchEducationUseCase: new FetchEducationUseCase(
      educationRepository,
      educationEntity
    ),
    deleteExperienceUseCase: new DeleteExperienceUseCase(experienceRepository),
    deleteEducationUseCase: new DeleteEducationUseCase(educationRepository),
    fetchProfieUseCase: new FetchProfieUseCase(
      profileRepository,
      profileEntity,
      candidateRepository
    ),
    resumeUploadUseCase: new ResumeUploadUseCase(
      profileRepository,
      candidateRepository,
      profileEntity,
      gcpStorageService,
      candidateEntity
    ),
    changeNameUseCase: new ChangeNameUseCase(
      candidateRepository,
      passwordServices,
      candidateEntity
    ),
    verificationEmailUseCase: new VerificationEmailUseCase(
      candidateRepository,
      emailOtpService,
      otpRepository,
      passwordServices,
      candidateEntity
    ),
    deleteAccountUseCase: new DeleteAccountUseCase(
      candidateRepository,
      candidateEntity
    ),

    deleteResumeUseCase: new DeleteResumeUseCase(
      candidateRepository,
      profileRepository,
      profileEntity,
      candidateEntity
    )
    ,
    applyJobUseCase: new ApplyJobUseCase(
      jobApplyRepository,
      profileRepository,
      applyEntity,
      educationRepository,
      experienceRepository,
    ),
    appliedJobUseCase: new AppliedJobUseCase(jobApplyRepository)
  }
}
export default candidateContainer

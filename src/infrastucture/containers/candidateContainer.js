import LoginUseCase from '../../application/useCase/commomUseCase/loginUseCase.js'
import ProfileUploadUseCase from '../../application/useCase/candidate/profileUploadUseCase.js'
import SignupUseCase from '../../application/useCase/commomUseCase/signupUseCase.js'
import CandidateRepository from '../repositories/candidate/candidateRepository.js'
import GCPStorageService from '../services/gcpService.js'
import PasswordServices from '../services/passwordfService.js'
import TokenService from '../../infrastucture/services/jwtService.js'
import CandidateEntity from '../../domain/entities/candidate/CandidateEntity.js'
import LogoutUseCase from '../../application/useCase/candidate/logoutUseCase.js'
import ProfileUseCase from '../../application/useCase/candidate/profileUseCase.js'
import ProfileEntity from '../../domain/entities/candidate/ProfileEntity.js'
import ProfileRepository from '../repositories/candidate/profileRepository.js'
import ExperienceUseCase from '../../application/useCase/candidate/experienceUseCase.js'
import ExperienceEntity from '../../domain/entities/candidate/ExperienceEntity.js'
import ExperienceRepository from '../repositories/candidate/experienceRepository.js'
import FetchExperienceUseCase from '../../application/useCase/candidate/FetchExperienceUseCase.js'
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

const candidateContainer = () => {
  const candidateRepository = new CandidateRepository()
  const gcpStorageService = new GCPStorageService()
  const passwordServices = new PasswordServices()
  const tokenService = new TokenService()
  const profileRepository = new ProfileRepository()
  const experienceRepository = new ExperienceRepository()
  const educationRepository = new EducationRepository()
  const otpRepository = new OtpRepository()
  const emailOtpService = new EmailOtpService()

  const candidateEntity = CandidateEntity
  const profileEntity = ProfileEntity
  const experienceEntity = ExperienceEntity
  const educationEntity = EducationEntity

  return {
    signupUseCase: new SignupUseCase(
      candidateRepository,
      passwordServices,
      candidateEntity
    ),

    loginUseCase: new LoginUseCase(
      candidateRepository,
      passwordServices,
      tokenService,
      candidateEntity
    ),

    logoutUseCase: new LogoutUseCase(),

    profileUploadUseCase: new ProfileUploadUseCase(
      candidateRepository,
      gcpStorageService,
      candidateEntity
    ),

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
  }
}
export default candidateContainer

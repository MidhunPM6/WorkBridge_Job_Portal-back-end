import LoginUseCase from '../../application/useCase/candidate/loginUseCase.js'
import ProfileUploadUseCase from '../../application/useCase/candidate/profileUploadUseCase.js'
import SignupUseCase from '../../application/useCase/candidate/signupUseCase.js'
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




const candidateContainer = () => {
  const candidateRepository = new CandidateRepository()
  const gcpStorageService = new GCPStorageService()
  const passwordServices = new PasswordServices()
  const tokenService = new TokenService()
  const profileRepository = new ProfileRepository()
  const experienceRepository = new ExperienceRepository()
  const educationRepository = new EducationRepository()
  
 

  const candidateEntity = CandidateEntity
  const profileEntity = ProfileEntity
  const experienceEntity = ExperienceEntity
  const educationEntity =EducationEntity

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

    profileUseCase: new ProfileUseCase(profileEntity, profileRepository),

    experienceUseCase: new ExperienceUseCase(
      experienceEntity,
      experienceRepository
    ),

    fetchExperienceUseCase: new FetchExperienceUseCase(experienceRepository,experienceEntity),
    educationUseCase: new EducationUseCase(educationRepository, educationEntity),
    fetchEducationUseCase : new FetchEducationUseCase(educationRepository,educationEntity),
    deleteExperienceUseCase : new DeleteExperienceUseCase(experienceRepository),
    deleteEducationUseCase : new DeleteEducationUseCase(educationRepository),
  }
}
export default candidateContainer

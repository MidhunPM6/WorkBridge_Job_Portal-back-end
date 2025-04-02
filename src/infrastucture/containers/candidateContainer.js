import LoginUseCase from '../../application/useCase/candidate/loginUseCase.js'
import ProfileUploadUseCase from '../../application/useCase/candidate/profileUploadUseCase.js'
import SignUpUseCase from '../../application/useCase/candidate/signUpUseCase.js'
import CandidateRepository from '../repositories/candidate/candidateRepository.js'
import GCPStorageService from '../services/gcpService.js'
import PasswordServices from '../services/passwordfService.js'
import TokenService from '../../infrastucture/services/jwtService.js'
import CandidateEntity from '../../domain/entities/canditate/CandidateEntity.js'
import LogoutUseCase from '../../application/useCase/candidate/logoutUseCase.js'
import ProfileUseCase from '../../application/useCase/candidate/profileUseCase.js'
import ProfileEntity from '../../domain/entities/canditate/ProfileEntity.js'
import ProfileRepository from '../repositories/candidate/profileRepository.js'
import ExperienceUseCase from '../../application/useCase/candidate/experienceUseCase.js'
import ExperienceEntity from '../../domain/entities/canditate/ExperienceEntity.js'
import ExperienceRepository from '../repositories/candidate/experienceRepository.js'




const candidateContainer = () => {
  const candidateRepository = new CandidateRepository()
  const gcpStorageService = new GCPStorageService()
  const passwordServices = new PasswordServices()
  const tokenService = new TokenService()
  const profileRepository = new ProfileRepository()
  const experienceRepository = new ExperienceRepository()

  const candidateEntity = CandidateEntity
  const profileEntity = ProfileEntity
  const experienceEntity =ExperienceEntity

  return {
    signupUseCase: new SignUpUseCase(
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

    experienceUseCase : new ExperienceUseCase(experienceEntity,experienceRepository)
  }
}
export default candidateContainer

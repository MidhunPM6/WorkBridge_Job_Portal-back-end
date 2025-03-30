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





const candidateContainer = () => {
  const candidateRepository = new CandidateRepository()
  const gcpStorageService = new GCPStorageService()
  const passwordServices = new PasswordServices()
  const tokenService = new TokenService()
  const profileRepository =new ProfileRepository()
  const candidateEntity = CandidateEntity
  const profileEntity = ProfileEntity

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

    profileUseCase  : new ProfileUseCase(profileEntity,profileRepository)


  }
}
export default candidateContainer

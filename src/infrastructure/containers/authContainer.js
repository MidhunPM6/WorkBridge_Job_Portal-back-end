import OAuthUseCase from '../../application/useCase/commomUseCase/OAuthUseCase.js'
import CandidateEntity from '../../domain/entities/candidate/CandidateEntity.js'
import CandidateRepository from '../repositories/candidate/candidateRepository.js'
import OAuthService from '../services/OAuthService.js'
import TokenService from '../services/jwtService.js'
import LoginUseCase from '../../application/useCase/commomUseCase/loginUseCase.js'
import SignupUseCase from '../../application/useCase/commomUseCase/signupUseCase.js'
import PasswordServices from '../services/passwordfService.js'
import LogoutUseCase from '../../application/useCase/candidate/logoutUseCase.js'
import EmployerEntity from '../../domain/entities/employer/EmployerEnitity.js'
import EmployerRepository from '../repositories/employer/EmployerRepository.js'



const authContainer = () => {
  const candidateRepository = new CandidateRepository()
  const OauthService = new OAuthService()
  const candidateEntity = CandidateEntity 
  const tokenService = new TokenService()
  const passwordServices = new PasswordServices()
  const employerRepository = new EmployerRepository()
  const employerEntity = EmployerEntity
  


  return {
    signupUseCase: new SignupUseCase(
      candidateRepository,
      passwordServices,
      candidateEntity,
      employerRepository,
      employerEntity,   
    ),

    loginUseCase: new LoginUseCase(
      candidateRepository,
      passwordServices,
      tokenService,
      employerRepository,
    ),
    OAuthUsecase: new OAuthUseCase(
      OauthService,
      candidateRepository,
      candidateEntity,
      tokenService,
      employerRepository,
      employerEntity
    ),
    logoutUseCase: new LogoutUseCase()
  }
}

export default authContainer

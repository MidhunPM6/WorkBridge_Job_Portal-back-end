import OAuthUseCase from '../../application/useCase/commomUseCase/OAuthUseCase.js'
import CandidateEntity from '../../domain/entities/canditate/CandidateEntity.js'
import CandidateRepository from '../repositories/candidate/candidateRepository.js'
import OAuthService from '../services/OAuthService.js'
import TokenService from '../../infrastucture/services/jwtService.js'



const OAuthContainer = () => {
  const candidateRepository = new CandidateRepository()
  const OauthService = new OAuthService()
  const candidateEntity =  CandidateEntity
  const tokenService = new TokenService()
  return{
    
    OAuthUsecase: new OAuthUseCase(
      OauthService,
      candidateRepository,
      candidateEntity,
      tokenService
      
    )
  }
}

export default OAuthContainer

import OAuthUseCase from '../../application/useCase/commomUseCase/OAuthUseCase.js'
import CandidateRepository from '../repositories/candidateRepository.js'
import { handleOAuthServices } from '../services/OAuthService.js'


const OAuthContainer = () => {
  const candidateRepository = new CandidateRepository()
  return{
    
    OAuthUsecase: new OAuthUseCase(
      handleOAuthServices,
      candidateRepository,
    )
  }
}

export default OAuthContainer

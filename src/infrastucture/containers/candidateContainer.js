
import LoginUseCase from '../../application/useCase/candidate/loginUseCase.js'
import ProfileUploadUseCase from '../../application/useCase/candidate/profileUploadUseCase.js'
import SignUpUseCase from '../../application/useCase/candidate/signUpUseCase.js'
import CandidateRepository from '../repositories/candidateRepository.js'
import GCPStorageService from '../services/gcpService.js'
import PasswordServices from '../services/passwordfService.js'
import TokenService from '../../infrastucture/services/jwtService.js'

 
  
const candidateContainer =() =>{
  const candidateRepository = new CandidateRepository()
  const gcpStorageService = new GCPStorageService()
  const passwordServices =new PasswordServices()
  const tokenService =new TokenService()
  return{

    signUpUseCase : new SignUpUseCase(candidateRepository,passwordServices) , 
    logInUseCase : new LoginUseCase(candidateRepository,passwordServices,tokenService),
    profileUploadUseCase : new ProfileUploadUseCase(candidateRepository,gcpStorageService)

  }
}
export default candidateContainer

 
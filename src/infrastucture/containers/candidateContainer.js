
import LoginUseCase from '../../application/useCase/candidate/loginUseCase.js'
import ProfileUploadUseCase from '../../application/useCase/candidate/profileUploadUseCase.js'
import SignUpUseCase from '../../application/useCase/candidate/signUpUseCase.js'
import CandidateRepository from '../repositories/candidateRepository.js'
import GCPStorageService from '../services/gcpService.js'
import PasswordServices from '../services/passwordfService.js'
import TokenService from '../../infrastucture/services/jwtService.js'
import CandidateEntity from '../../domain/entities/canditate/CandidateEntity.js'


 
  
const candidateContainer =() =>{
  const candidateRepository = new CandidateRepository()
  const gcpStorageService = new GCPStorageService()
  const passwordServices =new PasswordServices()
  const tokenService =new TokenService()
  const candidateEntity=CandidateEntity
 
  return{

    signUpUseCase : new SignUpUseCase(candidateRepository,passwordServices) , 
    logInUseCase : new LoginUseCase(candidateRepository,passwordServices,tokenService),
    profileUploadUseCase : new ProfileUploadUseCase(candidateRepository,gcpStorageService,candidateEntity)

  } 
}
export default candidateContainer

 
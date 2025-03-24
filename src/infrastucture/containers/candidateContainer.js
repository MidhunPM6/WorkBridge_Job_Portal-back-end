
import LoginUseCase from '../../application/useCase/candidate/loginUseCase.js'
import ProfileUploadUseCase from '../../application/useCase/candidate/profileUploadUseCase.js'
import SignUpUseCase from '../../application/useCase/candidate/signUpUseCase.js'
import CandidateRepository from '../repositories/candidateRepository.js'
import { uploadToGCP } from '../services/gcpService.js'
import {generateToken} from '../services/jwtService.js'




const candidateContainer =() =>{
  const candidateRepository = new CandidateRepository()
  return{

    signUpUseCase : new SignUpUseCase(candidateRepository) , 
    logInUseCase : new LoginUseCase(candidateRepository,generateToken),
    profileUploadUseCase : new ProfileUploadUseCase(uploadToGCP)

  }
}
export default candidateContainer

 
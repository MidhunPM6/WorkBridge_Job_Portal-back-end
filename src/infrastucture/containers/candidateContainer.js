
import LoginUseCase from '../../application/useCase/candidate/loginUseCase.js'
import SignUpUseCase from '../../application/useCase/candidate/SignUpUseCase.js'
import CandidateRepository from '../repositories/candidateRepository.js'
import {generateToken} from '../services/jwtService.js'


const candidateContainer =() =>{
  const candidateRepository = new CandidateRepository()
  return{

    signUpUseCase : new SignUpUseCase(candidateRepository) , 
    logInUseCase : new LoginUseCase(candidateRepository,generateToken)

  }
}
export default candidateContainer

 

import SignUpUseCase from '../../application/useCase/candidate/SignUpUseCase.js'
import CandidateRepository from '../repositories/candidateRepository.js'


const candidateContainer =() =>{
  const candidateRepository = new CandidateRepository()
  return{

    signUpUseCase : new SignUpUseCase(candidateRepository)  
  }
}
export default candidateContainer

 
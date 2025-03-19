
import UserAuthUseCase from '../../application/useCase/canditate/UserAuthUseCase.js'
import UserRepository from '../repositories/UserReposistory.js'

  const userRepository = new UserRepository()
  export const UserAuthUsecase = new UserAuthUseCase(userRepository)  
  

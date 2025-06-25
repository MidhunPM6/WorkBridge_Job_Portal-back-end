import ProfileUploadUseCase from '../../application/useCase/commomUseCase/profileUploadUseCase.js'
import CandidateEntity from '../../domain/entities/candidate/CandidateEntity.js'
import CandidateReposistory from '../repositories/candidate/candidateRepository.js'
import EmployerEntity from '../../domain/entities/employer/EmployerEnitity.js'
import EmployerRepository from '../repositories/employer/employerRepository.js'
import GCPStorageService from '../services/gcpService.js'


const commonContainer = () => {
  const candidateRepository = new CandidateReposistory()
  const gcpStorageService = new GCPStorageService()
  const employerRepository = new EmployerRepository()
  const employerEntity = EmployerEntity
  const candidateEntity = CandidateEntity

  return {
    profileUploadUseCase: new ProfileUploadUseCase(
      candidateRepository,
      gcpStorageService,
      candidateEntity,
      employerRepository,
      employerEntity
    )
  }
}

export default commonContainer

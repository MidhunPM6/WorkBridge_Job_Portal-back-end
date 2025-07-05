import ProfileUploadUseCase from '../../application/useCase/commomUseCase/profileUploadUseCase.js'
import CandidateEntity from '../../domain/entities/candidate/CandidateEntity.js'
import CandidateReposistory from '../repositories/candidate/candidateRepository.js'
import EmployerEntity from '../../domain/entities/employer/EmployerEnitity.js'
import EmployerRepository from '../repositories/employer/employerRepository.js'
import GCPStorageService from '../services/gcpService.js'
import FetchEmployerDataUseCase  from '../../application/useCase/commomUseCase/fetchEmployerDataUseCase.js'
import CompanyProfileRepository from '../repositories/employer/companyProfileRespository.js'
import CompanyProfileEntity from '../../domain/entities/employer/CompanyProfileEnitity.js'
import FetchCandidateDataUseCase from '../../application/useCase/commomUseCase/fetchCandidateDataUseCase.js'
import ProfileRepository from '../repositories/candidate/profileRepository.js'
import ProfileEntity from '../../domain/entities/candidate/ProfileEntity.js'
import MessageEntity from '../../domain/entities/common/MessageEntity.js'
import MessageRepository from '../repositories/common/messageRepository.js'
import SaveMessageUseCase from '../../application/useCase/commomUseCase/saveMessageUseCase.js'





const commonContainer = () => {
  const candidateRepository = new CandidateReposistory()
  const gcpStorageService = new GCPStorageService()
  const employerRepository = new EmployerRepository()
  const companyProfileRepository = new CompanyProfileRepository()
  const profileRepository = new ProfileRepository()
  const messageRepository = new MessageRepository()
  const employerEntity = EmployerEntity
  const candidateEntity = CandidateEntity
  const compnayEntity = CompanyProfileEntity
  const profileEntity = ProfileEntity
  const messageEntity = MessageEntity

  return {
    profileUploadUseCase: new ProfileUploadUseCase(
      candidateRepository,
      gcpStorageService,
      candidateEntity,
      employerRepository,
      employerEntity
    ),

    fetchEmployerDataUseCase: new FetchEmployerDataUseCase(
      companyProfileRepository,
      compnayEntity
    ),

    fetchCandidateDataUseCase: new FetchCandidateDataUseCase(
      profileRepository,
      profileEntity
    ),
    saveMessageUseCase: new SaveMessageUseCase(messageRepository, messageEntity)
  }
}

export default commonContainer

import ICandidateRepository from '../../domain/repositories/ICandidateRepository.js'
import { Candidate } from '../database/candidateModel.js'
import bcrypt from 'bcrypt'

export default class CandidateReposistory extends ICandidateRepository {

  async create (canditateEntity) {
    const hashedPassword = await bcrypt.hash(canditateEntity.password, 10)

    const candidate = new Candidate({
      name: canditateEntity.name,
      email:canditateEntity.email,
      password: hashedPassword
    })

    return await candidate.save()
    
  }

  async findByEmail (email) {
    return await Candidate.findOne({email})
  } 
} 

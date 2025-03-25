import ICandidateRepository from '../../domain/repositories/ICandidateRepository.js'
import { Candidate } from '../database/candidateModel.js'
import bcrypt from 'bcrypt'

export default class CandidateReposistory extends ICandidateRepository {
  async create (candidateEntity) {
    
    const candidate = new Candidate({
      name: candidateEntity.name,
      email: candidateEntity.email,
      password: candidateEntity.password
    })

    return await candidate.save()
  }

  async findByEmail (email) {
    return await Candidate.findOne({ email })
  }

  async updateByEmail (email,User) {
    return await Candidate.findOneAndUpdate(  
      {email : email},
       {$set : User})
  }
}

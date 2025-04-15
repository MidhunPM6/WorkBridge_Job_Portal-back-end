import mongoose from 'mongoose'
import ICandidateRepository from '../../../domain/repositories/candidate/ICandidateRepository.js'
import { Candidate } from '../../database/canditateModels/candidateModel.js'


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

  async updateByEmail (email, User) {
    return await Candidate.findOneAndUpdate({ email: email }, { $set: User })
  }

  async findByID (userID) {
    return await Candidate.findById(userID)
  }

  async updateByID (id, updateData) {
    return await Candidate.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, timestamps: false }
    )
  }
  async deleteById (userID) {
    const objectId = new mongoose.Types.ObjectId(userID)
    return await Candidate.findByIdAndDelete(objectId)
  }
  
}

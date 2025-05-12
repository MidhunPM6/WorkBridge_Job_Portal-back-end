import mongoose from 'mongoose'
import IEmployerRepository from '../../../domain/repositories/employer/IEmployerRepository.js'
import { Employer } from '../../database/employerModels/employerModel.js'

export default class EmployerRepository extends IEmployerRepository {
  async create (employerEntity) {
    const employer = new Employer({
      name: employerEntity.name,
      email: employerEntity.email,
      password: employerEntity.password,
      role: employerEntity.role
    })

    return await employer.save()
  }

  async findByEmail (email) {
    return await Employer.findOne({ email })
  }

  async updateByEmail (email, User) {
    return await Employer.findOneAndUpdate({ email: email }, { $set: User })
  }

  async findByID (userID) {
    return await Employer.findById(userID)
  }

  async updateByID (id, updateData) {
    return await Employer.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, timestamps: false }
    )
  }
  async deleteById (userID) {
    const objectId = new mongoose.Types.ObjectId(userID)
    return await Employer.findByIdAndDelete(objectId)
  }
}

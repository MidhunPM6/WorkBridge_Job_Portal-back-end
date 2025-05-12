import IEducationRepository from '../../../domain/repositories/candidate/IEducationRepository.js'
import { EducationModel } from '../../database/canditateModels/EducationModel.js'

export default class EducationRepository extends IEducationRepository {
  async create (data) {
    const newEducation = new EducationModel({
      college: data.college,
      field: data.field,
      StartDate: data.StartDate,
      Passed: data.Passed,
      userID: data.userID
    })
    return await newEducation.save()
  }

  async getByUserId (userID) {
    return await EducationModel.find({ userID })
  }

  async deleteById (eduID) {
   return await EducationModel.findByIdAndDelete(eduID)
  }
}

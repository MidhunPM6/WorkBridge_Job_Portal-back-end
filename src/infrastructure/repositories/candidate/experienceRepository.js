import { ExperienceModel } from '../../database/canditateModels/ExperienceModel.js'
import IExperienceRepository from '../../../domain/repositories/candidate/IExperienceRepository.js'

export default class ExperienceRepository extends IExperienceRepository {
  async create (data) {
    const newExperience = new ExperienceModel({
      position: data.position,
      company: data.company,
      StartDate: data.StartDate,
      EndDate: data.EndDate,
      tasks: data.tasks,
      userID: data.userID
    })
    return newExperience.save()
  }

  async getByUserId (userID) {
    return ExperienceModel.find({ userID })
  }
  async deleteById (expID) {
    return await  ExperienceModel.findByIdAndDelete(expID)
  }
}

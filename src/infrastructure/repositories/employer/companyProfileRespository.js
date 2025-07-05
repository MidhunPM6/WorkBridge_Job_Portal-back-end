import ICompanyProfileRepository from "../../../domain/repositories/employer/ICompanyProfileRespository.js"
import { companyProfileModel } from "../../database/employerModels/companyProfileModel.js"


export default class CompanyProfileRepository extends ICompanyProfileRepository {
  async create (data) {
    const result = await companyProfileModel.create(data)
    return result.toObject()
  }

  async findById (userID) {
    const profile = await companyProfileModel.findOne({ userID })
    return profile ? profile.toObject() : null
  }

  async updateById (userID, updatedData) {
    const updated = await companyProfileModel.findOneAndUpdate(
      { userID },
      { ...updatedData, updatedAt: new Date().toString() },
      { new: true }
    )
    return updated ? updated.toObject() : null
  }

  async getById (userID) {
    const profile = await companyProfileModel.findOne({ userID })
    return profile
  }
  async findAllProfiles() {
    const profiles = await companyProfileModel.find().lean().populate('userID')
    

    return profiles
  }
}

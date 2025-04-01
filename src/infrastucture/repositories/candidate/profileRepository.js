import IProfileRepository from '../../../domain/repositories/candidate/IProfileRepository.js'
import { ProfileModel } from '../../database/canditateModels/profileModel.js'

export default class ProfileRepository extends IProfileRepository {
  // Checking the userID having Profile data 
  async findByID (userID) {
    return await ProfileModel.findOne({ userID: userID })
  }

// Saving new data if the profile were not exist before with the current user id 
  async create (data) {
    const newProfle = new ProfileModel({
      designation: data.designation,
      location: data.location,
      mobile: data.mobile,
      portfolio: data.portfolio,
      linkedin: data.linkedin,
      about: data.about,
      skills: data.skills,
      userID: data.userID
    })
    return await newProfle.save()
  }

  //  Once already having the profile data it will update with current data 
  async updateById (userID, updatedData) {
    return  ProfileModel.findOneAndUpdate(
      { userID: userID },           
      { $set: updatedData },
      { new: true }
    )
  }
}

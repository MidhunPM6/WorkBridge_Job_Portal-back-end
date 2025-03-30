import IProfileRepository from '../../../domain/repositories/candidate/IProfileRepository.js'
import { ProfileModel } from '../../database/canditateModels/profileModel.js'



export default class ProfileRepository extends IProfileRepository{
    async create (data){
      const newProfle  = new ProfileModel({
        designation : data.designation,
        location : data.location,
        mobile : data.moblie,
        portfolio : data.portfolio,
        linkedin : data.linkedin,
        about : data.about,
        skills : data.skills
      })
      return await newProfle.save()
    }
}
import Otp from "../../database/commonModels/OtpModel.js"


export default class OtpRepository {
    async create({email,otp}) {
       const saveOtp =  new Otp({
        email:email,otp:otp
    })
       return await saveOtp.save()
    }
    async findByEmail({email : email}){
       return await Otp.findOne(email)
    }
    async updateByEmail(email,updatedData) {
        await Otp.findOneAndUpdate(
            { email },                 
            { otp: updatedData },     
            { new: true, upsert: true } 
          );
    }
} 
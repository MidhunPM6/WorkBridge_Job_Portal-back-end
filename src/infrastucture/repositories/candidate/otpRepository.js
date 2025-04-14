import Otp from "../../database/commonModels/OtpModel.js"


export default class OtpRepository {
    async create({email,otp}) {
       const saveOtp =  new Otp({
        email:email,otp:otp
    })
       return await saveOtp.save()
    }
} 
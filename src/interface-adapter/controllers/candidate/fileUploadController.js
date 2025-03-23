import { uploadToGCP } from "../../../infrastucture/services/gcpService.js"
 
export const profileFileUpload = async(req,res) =>{
     
    const response = await  uploadToGCP(req.file)
} 
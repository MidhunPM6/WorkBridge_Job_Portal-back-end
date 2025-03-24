import candidateContainer from "../../../infrastucture/containers/candidateContainer.js"
import { uploadToGCP } from "../../../infrastucture/services/gcpService.js"

const {profileUploadUseCase} = candidateContainer()

export const profileFileUpload = async(req,res) =>{
     
    const response = await profileUploadUseCase.execute(req.file)
} 
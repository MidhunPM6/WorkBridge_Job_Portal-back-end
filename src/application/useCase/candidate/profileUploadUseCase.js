


export default class ProfileUploadUseCase{
    constructor(uploadToGCP){
       this.uploadToGCP = uploadToGCP
    }
    async execute(file){
        try {
            
            const uploadFile =  await this.uploadToGCP(file)
            console.log(uploadFile);
            
        } catch (error) {
            console.error(error);
            throw new Error("File upload failed ");
            
            
        }
         
    }
}
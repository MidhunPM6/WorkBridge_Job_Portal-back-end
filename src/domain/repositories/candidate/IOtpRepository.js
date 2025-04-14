export default class IOtpRepository {
    async create(email,otp) {
        throw new Error("The method create is required");
    }
    async findByEmail(email){
        throw new Error("The method findByEmail is required");
    }
    async updateByEmail(email,updatedData) {
        throw new Error("The method updateByEmail is required");
    }
}
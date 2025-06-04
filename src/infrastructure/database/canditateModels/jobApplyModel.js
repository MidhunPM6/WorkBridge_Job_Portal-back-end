 import mongoose from 'mongoose';

 const jobApplySchema = new mongoose.Schema({
    jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
        required: true
        },
    userID: {
        type: mongoose.Schema.Types.ObjectId,

        ref: 'User',    

        required: true
        },
    employerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employer',
        required: true
    }
});
    const JobApplyModel = mongoose.model('JobApply', jobApplySchema);
    
    export default JobApplyModel;
    
    

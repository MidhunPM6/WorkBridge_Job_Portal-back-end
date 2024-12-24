const mongoose =require('mongoose')

const AppliedJobScehma=new mongoose.Schema({
    jobid :{
        type :mongoose.Schema.Types.ObjectId,
        required:true
    }, 
    userid:{
      type:mongoose.Schema.Types.ObjectId,
      
      required:true

    }
,
    empid:{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
    }
})

const AppliedJobs=mongoose.model('AppliedJobs',AppliedJobScehma)
AppliedJobs.createIndexes()
module.exports = AppliedJobs
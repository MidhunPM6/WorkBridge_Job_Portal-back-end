const mongoose =require('mongoose')
const PostedJobs = require('./JobPostSchema')
const User = require('./User')
const EmpUser = require('./EmpUser')



const AppliedJobScehma=new mongoose.Schema({
    jobid :{
        type :mongoose.Schema.Types.ObjectId,
        required:true,
        ref :"PostedJobs"
    }, 
    userid:{
      type:mongoose.Schema.Types.ObjectId,
      
      required:true,

      ref:'User'

    }
,
    empid:{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
        ref :'EmpUser'
    },
    AppliedDate:{
        type:String,
        required:true,
    },

    AppliedTime:{
        type:String,
        required:true,

    }
},
{timestamps:true}
)

const AppliedJobs=mongoose.model('AppliedJobs',AppliedJobScehma)
AppliedJobs.createIndexes()
module.exports = AppliedJobs
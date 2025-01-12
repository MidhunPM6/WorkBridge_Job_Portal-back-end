const mongoose =require('mongoose')

const ResumeUpload=new mongoose.Schema({
    filename : String,
    data :Buffer,
    contentType:String,


})
const Resume=mongoose.model('resumeUpload',ResumeUpload)
Resume.createIndexes()
module.exports=Resume

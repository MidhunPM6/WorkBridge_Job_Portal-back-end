const dotenv = require("dotenv").config().parsed;
const ConnectDB = require("./dbconfig");
const AuthRouters =  require('./Routers/AuthRouter')
const JobPostRouter =require('./Routers/PostjobRouter')
const JobDetailsRouter = require('./Routers/JobDetailsRouter')
const AppliedJob =require('./Routers/AppiledJobRouter')
const RecivedApplication = require('./Routers/RecivedApplication')
const ResumeUploadRouter =require('./Routers/ResumeuploadRouter')


const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");



const app = express(); 
app.use(express.json());
app.use(cors());
cors({
  origin: dotenv.FRONTEND_URL,
  credentials: true
})
app.use("/api/auth", AuthRouters);

app.use("/api/jobposting",JobPostRouter);
app.use('/api/jobdetails',JobDetailsRouter)
app.use('/api/jobapplication',AppliedJob)
app.use('/api/recivedjob',RecivedApplication) 
app.use('/api/resumeupload',ResumeUploadRouter)

       
 
 
//Port Configuration
app.listen(dotenv.SERVER_PORT, () => {
  console.log(`Port Running on ${dotenv.SERVER_PORT}`);
});
 

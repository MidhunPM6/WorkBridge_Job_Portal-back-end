const dotenv = require("dotenv").config().parsed;
const ConnectDB = require("./dbconfig");
const AuthRouters =  require('./Routers/AuthRouter')
const JobPostRouter =require('./Routers/Employer_Routes/PostjobRouter')
const JobDetailsRouter = require('./Routers/Employee_Routes/JobDetailsRouter')
const AppliedJob =require('./Routers/Employee_Routes/AppiledJobRouter')
const RecivedApplication = require('./Routers/Employer_Routes/RecivedApplication')
const ResumeUploadRouter =require('./Routers/Employee_Routes/ResumeuploadRouter')


const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const cookieParser =require('cookie-parser')



const app = express(); 
app.use(express.json());
app.use(cors({
  origin: dotenv.FRONTEND_URL,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
}));

app.use(cookieParser())


//Routes
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
 

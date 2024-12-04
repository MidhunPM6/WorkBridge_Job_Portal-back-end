const dotenv = require("dotenv").config().parsed;
const ConnectDB = require("./dbconfig");
const AuthRouters =  require('./Routers/AuthRouter')
const JobPostRouter =require('./Routers/PostjobRouter')
const JobDetailsRouter = require('./Routers/JobDetailsRouter')

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

      
 
 
//Port Configuration
app.listen(dotenv.SERVER_PORT, () => {
  console.log(`Port Running on ${dotenv.SERVER_PORT}`);
});

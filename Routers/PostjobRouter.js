const express = require('express')
const {jobPost} =require('../Controllers/Employer Controllers/JobPostController')


const router=express.Router();
router.post ('/jobpost',jobPost)

module.exports=router 
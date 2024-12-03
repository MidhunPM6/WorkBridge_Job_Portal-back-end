const express = require('express')
const {jobPost} =require('../Controllers/JobPost')


const router=express.Router();
router.post ('/jobpost',jobPost)

module.exports=router 
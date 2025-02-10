const express = require('express');
const { AppliedJob } = require('../../Controllers/Employee Controllers/AppliedJobController');

const router=express.Router();

router.post('/appliedjob',AppliedJob)


module.exports=router 


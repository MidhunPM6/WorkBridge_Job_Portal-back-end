const express =require('express');
const { storedJob } = require('../../Controllers/Jobseeker Controllers/StoredJobController');

const router=express.Router();

 router.get('/storedjobdetails',storedJob)

module.exports=router 
const express = require('express');
const { fetchRecivedApplication } = require('../Controllers/Employer Controllers/RecivedApplication');

const router=express.Router();
router.post('/recivedapplication',fetchRecivedApplication)



module.exports=router 
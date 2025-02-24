const express = require('express')
const {registerUser,LoginUser, LogoutUser, testConsole}=require('../Controllers/Jobseeker Controllers/AuthController') 
const {empSignup, empLogin}=require('../Controllers/Employer Controllers/EmpAuthController');


const router=express.Router();

//User Routes
router.post('/register',registerUser)
router.post('/login',LoginUser)
router.post('/logout',LogoutUser)
router.post('/test',testConsole)



//Employer Routes
router.post('/empregister',empSignup)
router.post('/emplogin',empLogin) 



 



module.exports=router 
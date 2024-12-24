const express = require('express')
const {registerUser,LoginUser}=require('../Controllers/AuthController') 
const {empSignup, empLogin}=require('../Controllers/Employer Controllers/EmpAuthController');


const router=express.Router();

router.post('/register',registerUser)
router.post('/login',LoginUser)

router.post('/empregister',empSignup)
router.post('/emplogin',empLogin) 


 



module.exports=router 
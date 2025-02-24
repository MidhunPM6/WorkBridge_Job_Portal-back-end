const express =require('express');
const { googleAuth } = require('../../Controllers/Jobseeker Controllers/GoogleController');


const router = express.Router();

router.post('/google',googleAuth)

module.exports =router
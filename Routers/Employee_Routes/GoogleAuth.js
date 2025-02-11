const express =require('express');
const { googleAuth } = require('../../Controllers/Employee Controllers/GoogleController');


const router = express.Router();

router.post('/google',googleAuth)

module.exports =router
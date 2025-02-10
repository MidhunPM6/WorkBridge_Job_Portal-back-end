const express = require('express');
const multer = require('multer');
const { resumeUpload } = require('../../Controllers/Employee Controllers/ResumeUploadController');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
 
const router=express.Router();

router.post('/fileupload',upload.single("pdf"),resumeUpload)

module.exports=router       
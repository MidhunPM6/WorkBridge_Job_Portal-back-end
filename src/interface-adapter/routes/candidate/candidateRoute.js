import express from 'express'
import { profileFileUpload,personalProfile,experienceController,getExperience,educationController,getEducation } from '../../controllers/candidate/profileController.js'
import upload from '../../../infrastucture/storage/multerStorage.js'
import { verifyToken } from '../../../infrastucture/middleware/jwtVerifyMiddle.js'


 

const router =express.Router()


router.post('/fileupload',verifyToken,upload.single('file'),profileFileUpload)
router.post('/profile',verifyToken,personalProfile)

// Experience post and get routes 
router.post('/experience',verifyToken,experienceController)
router.get('/experience',verifyToken,getExperience)

// Education post and get routes
router.post('/education',verifyToken,educationController)
router.get('/education',verifyToken,getEducation)

 
export default router   
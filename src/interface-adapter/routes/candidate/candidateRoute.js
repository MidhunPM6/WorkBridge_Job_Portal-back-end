import express from 'express'
import {
  profileFileUpload,
  personalProfile,
  experienceController,
  getExperience,
  educationController,
  getEducation,
  deleteExperience,
  deleteEducation,
  getProfile,
  resumeUploadController,
  nameChangeController,
  otpGenarateController,
  verifyOtpController,
  deleteAccountController,
  deleteResumeController,
} from '../../controllers/candidate/profileController.js'
import {uploadImage, uploadPDF} from '../../../infrastucture/storage/multerStorage.js'
import { verifyToken } from '../../../infrastucture/middleware/jwtVerifyMiddle.js'


const router = express.Router()

router.post(
  '/fileupload',
  verifyToken,
  uploadImage.single('file'), 
  profileFileUpload
)
router.post('/profile', verifyToken, personalProfile)
router.get('/profile', verifyToken,getProfile)
router.post('/resumeUpload',verifyToken,uploadPDF.single('resume'),resumeUploadController)
router.post('/changename',verifyToken,nameChangeController)
router.post('/changepassword',verifyToken,otpGenarateController)
router.post('/verifyOtp',verifyToken,verifyOtpController)
router.delete('/deleteAccount',verifyToken,deleteAccountController)
router.delete('/deleteResume',verifyToken,deleteResumeController)

// Experience post and get routes
router.post('/experience', verifyToken, experienceController)
router.get('/experience', verifyToken, getExperience)
router.delete('/experience/:id', verifyToken, deleteExperience)

// Education post and get routes
router.post('/education', verifyToken, educationController)
router.get('/education', verifyToken, getEducation) 
router.delete('/education/:id', verifyToken, deleteEducation)
 


export default router

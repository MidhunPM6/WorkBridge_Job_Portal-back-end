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
import { authorizeRoles } from '../../../infrastucture/middleware/authenticateUser.js'



const router = express.Router()

router.post(
  '/fileupload',
  verifyToken,
  authorizeRoles('candidate'),
  uploadImage.single('file'), 
  profileFileUpload
)
router.post('/profile', verifyToken,authorizeRoles('candidate'),personalProfile)
router.get('/profile', verifyToken,authorizeRoles('candidate'),getProfile)
router.post('/resumeUpload',verifyToken ,authorizeRoles('candidate'),uploadPDF.single('resume'),resumeUploadController)
router.post('/changename',verifyToken,authorizeRoles('candidate'),nameChangeController)
router.post('/changepassword',verifyToken,authorizeRoles('candidate'),otpGenarateController)
router.post('/verifyOtp',verifyToken,authorizeRoles('candidate'),verifyOtpController)
router.delete('/deleteAccount',verifyToken,authorizeRoles('candidate'),deleteAccountController)
router.delete('/deleteResume',verifyToken,authorizeRoles('candidate'),deleteResumeController)
 
// Experience post and get routes
router.post('/experience', verifyToken, authorizeRoles('candidate'), experienceController)
router.get('/experience', verifyToken, authorizeRoles('candidate'), getExperience)
router.delete('/experience/:id', verifyToken, authorizeRoles('candidate'), deleteExperience)

// Education post and get routes
router.post('/education', verifyToken, authorizeRoles('candidate'), educationController)
router.get('/education', verifyToken, authorizeRoles('candidate'), getEducation) 
router.delete('/education/:id', verifyToken, authorizeRoles('candidate'), deleteEducation)
 


export default router

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
} from '../../controllers/candidate/profileController.js'
import upload from '../../../infrastucture/storage/multerStorage.js'
import { verifyToken } from '../../../infrastucture/middleware/jwtVerifyMiddle.js'

const router = express.Router()

router.post(
  '/fileupload',
  verifyToken,
  upload.single('file'), 
  profileFileUpload
)
router.post('/profile', verifyToken, personalProfile)
router.get('/profile', verifyToken,getProfile)

// Experience post and get routes
router.post('/experience', verifyToken, experienceController)
router.get('/experience', verifyToken, getExperience)
router.delete('/experience/:id', verifyToken, deleteExperience)

// Education post and get routes
router.post('/education', verifyToken, educationController)
router.get('/education', verifyToken, getEducation)
router.delete('/education/:id', verifyToken, deleteEducation)

export default router

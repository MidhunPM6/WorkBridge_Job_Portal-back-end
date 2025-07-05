import express from 'express'
import { verifyToken } from '../../../infrastructure/middleware/jwtVerifyMiddle.js'
import { authorizeRoles } from '../../../infrastructure/middleware/authenticateUser.js'
import { fetchAllJobsController, profileFileUpload ,fetchEmployerData,fetchCandidateData,fetchChatHistoryController} from '../../controllers/common/commonController.js'
import {uploadImage, uploadPDF} from '../../../infrastructure/storage/multerStorage.js'

const router = express.Router()

// Common job routes
router.post(
  '/fileupload',
  verifyToken,
  authorizeRoles('candidate', 'employer'),
  uploadImage.single('file'),
  profileFileUpload
)
router.get(
  '/jobs',
  verifyToken,
  authorizeRoles('candidate', 'employer'),
  fetchAllJobsController
)
router.get(
  '/fetchEmployerData',
  verifyToken,
  authorizeRoles('candidate', 'employer'),
  fetchEmployerData
)

router.get('/fetchCandidateData', verifyToken, authorizeRoles('candidate',"employer"), fetchCandidateData)

router.get("/fetchChatHistory/:id", verifyToken, authorizeRoles('candidate',"employer"), fetchChatHistoryController)

export default router

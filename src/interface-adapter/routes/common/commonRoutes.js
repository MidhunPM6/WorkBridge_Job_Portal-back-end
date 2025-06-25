import express from 'express'
import { verifyToken } from '../../../infrastructure/middleware/jwtVerifyMiddle.js'
import { authorizeRoles } from '../../../infrastructure/middleware/authenticateUser.js'
import { fetchAllJobsController, profileFileUpload } from '../../controllers/common/commonController.js'
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

export default router

import express from 'express'
import {
  employerJobPostController,
  fetchMyJobsController,
  updateJobController,
  deleteJobController,
  employerProfileController,
  fetchCompanyProfileController,
  fetchApplicationsController,
} from '../../controllers/employer/employerController.js'
import { verifyToken } from '../../../infrastructure/middleware/jwtVerifyMiddle.js'
import { authorizeRoles } from '../../../infrastructure/middleware/authenticateUser.js'

const router = express.Router()
// Employer profile routes

router.post('/postjob',
  verifyToken,
  authorizeRoles('employer'),
  employerJobPostController
)
router.get(
  '/myjobs',
  verifyToken,
  authorizeRoles('employer'),
  fetchMyJobsController
)
router.patch(
  '/updateJob/:id',
  verifyToken,
  authorizeRoles('employer'),
  updateJobController
)
router.delete(
  '/deleteJob/:id',
  verifyToken,
  authorizeRoles('employer'),
  deleteJobController
)
router.post(
  '/profile',
  verifyToken,
  authorizeRoles('employer'),
  employerProfileController
)
router.get(
  '/profileData',
  verifyToken,
  authorizeRoles('employer'),
  fetchCompanyProfileController
)
router.get(
  '/applications',
  verifyToken,
  authorizeRoles('employer'),
  fetchApplicationsController,
)

export default router

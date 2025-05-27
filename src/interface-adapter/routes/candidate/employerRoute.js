import express from 'express'
import { employerJobPostController, fetchAllJobsController } from '../../controllers/employer/employerController.js'
import { verifyToken } from '../../../infrastructure/middleware/jwtVerifyMiddle.js'
import { authorizeRoles } from '../../../infrastructure/middleware/authenticateUser.js'


const router = express.Router()
// Employer profile routes

router.post('/postjob', verifyToken, authorizeRoles('employer'), employerJobPostController)
router.get('/alljobs', verifyToken, authorizeRoles('employer'), fetchAllJobsController)

export default router

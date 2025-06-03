import express from 'express';
import { verifyToken } from '../../../infrastructure/middleware/jwtVerifyMiddle.js';
import { authorizeRoles } from '../../../infrastructure/middleware/authenticateUser.js';
import { fetchAllJobsController} from '../../controllers/common/commonController.js';

const router = express.Router();

// Common job routes
router.get('/jobs', verifyToken, authorizeRoles('candidate', 'employer'), fetchAllJobsController);


export default router;
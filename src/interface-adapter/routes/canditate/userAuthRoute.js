import express from 'express'
import { signUpController } from '../../controllers/canditate/userAuthController.js'
const router =express.Router()
  
router.post('/',signUpController)
export default router
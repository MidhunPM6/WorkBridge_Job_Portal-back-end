import express from 'express'
import { loginController, signUpController ,OAuthController} from '../../controllers/Auth/AuthController.js'

const router =express.Router()
  
router.post('/signup',signUpController)
router.post('/login',loginController)
router.post('/oauth',OAuthController)
export default router
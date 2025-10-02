import express from 'express'
import { loginController, signUpController ,OAuthController, logoutController} from '../../controllers/common/AuthController.js'

const router =express.Router()
  
router.post('/signup',signUpController)
router.post('/login',loginController)
router.post('/logout',logoutController)
router.post('/oauth',OAuthController)
export default router  
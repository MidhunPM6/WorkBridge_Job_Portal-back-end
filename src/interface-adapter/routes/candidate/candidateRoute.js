import express from 'express'
import { profileFileUpload,personalProfile,experienceController } from '../../controllers/candidate/profileController.js'
import upload from '../../../infrastucture/storage/multerStorage.js'
import { verifyToken } from '../../../infrastucture/middleware/jwtVerifyMiddle.js'




const router =express.Router()


router.post('/fileupload',verifyToken,upload.single('file'),profileFileUpload)
router.post('/profile',verifyToken,personalProfile)
router.post('/experience',verifyToken,experienceController)


export default router   
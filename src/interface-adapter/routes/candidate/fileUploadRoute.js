import express from 'express'
import { profileFileUpload } from '../../controllers/candidate/fileUploadController.js'
import upload from '../../../infrastucture/storage/multerStorage.js'
import { verifyToken } from '../../../infrastucture/middleware/jwtVerifyMiddle.js'




const router =express.Router()


router.post('/profile',verifyToken,upload.single('file'),profileFileUpload)

export default router   
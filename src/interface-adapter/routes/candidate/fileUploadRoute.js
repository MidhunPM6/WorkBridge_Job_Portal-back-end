import express from 'express'
import { profileFileUpload } from '../../controllers/candidate/fileUploadController.js'
import upload from '../../../infrastucture/storage/multerStorage.js'



const router =express.Router()


router.post('/profile',upload.single('file'),profileFileUpload)

export default router   
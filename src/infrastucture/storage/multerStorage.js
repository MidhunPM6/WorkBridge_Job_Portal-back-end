import multer from 'multer'

const storage = multer.memoryStorage()

const upload = multer({
    storage : storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg']

        if (!allowedTypes.includes(file.mimetype)) {
            return cb(new Error('Invalid file type. Only JPEG, PNG, and JPG are allowed.'), false)
        }
        cb(null, true)
    }
})

export default upload
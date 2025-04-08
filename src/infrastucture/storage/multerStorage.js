import multer from 'multer'

const storage = multer.memoryStorage()

export const uploadImage = multer({
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

export const uploadPDF = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // e.g. 10MB for PDFs
    fileFilter: (req, file, cb) => {
        if (file.mimetype !== 'application/pdf') {
            return cb(new Error('Only PDF files are allowed.'), false);
        }
        cb(null, true);
    }
});


import {  Storage } from '@google-cloud/storage'
import { fileURLToPath } from 'url'
import path from 'path'
import dotenv from 'dotenv'
dotenv.config()



const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const keyFilePath = path.resolve(__dirname, '..', process.env.GCP_KEY_FILE)

const storage = new Storage({
  keyFilename: keyFilePath
})

const bucket = storage.bucket(process.env.GCP_BUCKET_NAME)

// Service to upload user Profile files to Google cloud and recieved secure URL 
export const uploadToGCP = async file => {
  try {
    if (!file) {
      throw new Error('File missing or not provided')
    }

    const blob = bucket.file(Date.now() + '-' + file.originalname)

    await blob.save(file.buffer, {
      metadata: { contentType: file.mimetype }
    })

    const [url] = await blob.getSignedUrl({
      action: 'read',
      expires: Date.now() + 15 * 60 * 1000
    })
   

    return url
  } catch (error) {
    console.error('Error uploading to GCP:', error)
    throw new Error('File upload failed')
  }
}

import { Storage } from '@google-cloud/storage'
import { fileURLToPath } from 'url'
import path from 'path'
import dotenv from 'dotenv'
dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const keyFilePath = path.resolve(__dirname, '..', process.env.GCP_KEY_FILE)

// Service to upload user files to Google cloud and recieved secure URL

export default class GCPStorageService {
  constructor () {
    this.storage = new Storage({
      keyFilename: keyFilePath
    })

    this.bucket = this.storage.bucket(process.env.GCP_BUCKET_NAME)
  }

  async uploadToGCP (file,destination) {
    try {
      if (!file) {
        throw new Error('File missing or not provided')
      }

      const blob = this.bucket.file(destination)
       
      await blob.save(file.buffer, {
        metadata: { contentType: file.mimetype }
      })
    
      blob.makePublic()
      const publicUrl = `https://storage.googleapis.com/${this.bucket.name}/${blob.name}`;
      return publicUrl;

   
    } catch (error) {
      console.error('Error uploading to GCP:', error)
      throw new Error('File upload failed')
    }
  }
}

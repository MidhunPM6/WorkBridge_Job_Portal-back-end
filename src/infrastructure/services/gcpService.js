import { Storage } from '@google-cloud/storage'
import { fileURLToPath } from 'url'
import path from 'path'
import dotenv from 'dotenv'
import { log } from 'console'
dotenv.config()



export default class GCPStorageService { 
  constructor () {
    // Use Application Default Credentials (ADC)
    this.storage = new Storage()

    this.bucket = this.storage.bucket(process.env.GCP_BUCKET_NAME)
  }  

  async uploadToGCP (file, destination) {
    try {
      if (!file) {
        throw new Error('File missing or not provided')
      }

      const blob = this.bucket.file(destination)

      await blob.save(file.buffer, {
        metadata: { contentType: file.mimetype }
      })

      await blob.makePublic() // make the uploaded file publicly accessible

      const publicUrl = `https://storage.googleapis.com/${this.bucket.name}/${blob.name}`
      console.log(`File uploaded to GCP: ${publicUrl}`);
      return publicUrl
      

    } catch (error) {
      console.error('Error uploading to GCP:', error)
      throw new Error('File upload failed')
    }  
  }
}

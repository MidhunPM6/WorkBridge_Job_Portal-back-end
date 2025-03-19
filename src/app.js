import express from 'express'
import cors from 'cors'
import connectDB from './infrastucture/database/db.js'
import userAuthRoute from '../src/interface-adapter/routes/canditate/userAuthRoute.js'


export const  app = express()

app.use(express.json())

app.use(cors({
   origin : "http://localhost:3000",
   methods: ["GET", "POST", "PUT", "DELETE"],
   credentials : true
}))

app.use('/api/signup',userAuthRoute)







import express from 'express'
import cors from 'cors'
import connectDB from './infrastucture/database/db.js'
import AuthRoute from './interface-adapter/routes/candidate/authRoute.js'
import cookieParser from 'cookie-parser'
import candidateRoute from './interface-adapter/routes/candidate/candidateRoute.js'
export const  app = express()

app.use(express.json())
app.use(cookieParser())

app.use(cors({
   origin : "http://localhost:3000",
   methods: ["GET", "POST", "PUT", "DELETE"],
   credentials : true
}))

app.use('/api/auth',AuthRoute)
app.use('/api/candidate',candidateRoute)






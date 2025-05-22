import express from 'express'
import cors from 'cors'
import connectDB from './infrastructure/database/db.js'
import authRoute from './interface-adapter/routes/candidate/AuthRoute.js'
import cookieParser from 'cookie-parser'
import candidateRoute from './interface-adapter/routes/candidate/candidateRoute.js'
import employerRoute from './interface-adapter/routes/candidate/employerRoute.js'
export const  app = express()

app.use(express.json())
app.use(cookieParser())
 

app.use(cors({
   origin : ["http://localhost:3000", "https://work-bridge-sooty.vercel.app/"],
   methods: ["GET", "POST", "PUT", "DELETE"],
   credentials : true
}))

app.get('/', (req, res) => {
  res.send('Backend is running!');  // or any welcome message
});
app.use('/api/auth',authRoute)
app.use('/api/candidate',candidateRoute)
app.use('/api/employer', employerRoute)






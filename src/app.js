import express from 'express';
import cors from 'cors';
import connectDB from './infrastructure/database/db.js';
import authRoute from './interface-adapter/routes/candidate/AuthRoute.js';
import cookieParser from 'cookie-parser';
import candidateRoute from './interface-adapter/routes/candidate/candidateRoute.js';
import employerRoute from './interface-adapter/routes/candidate/employerRoute.js';

export const app = express();


app.set('trust proxy', 1);

const allowedOrigins = [
  'http://localhost:3000',
  'https://work-bridge-sooty.vercel.app'
];

//  Handle CORS with credentials
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS','PATCH'],
}));
 

app.options('*', cors({
  origin: allowedOrigins,
  credentials: true
}));
  
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Backend is running!');
});

app.use('/api/auth', authRoute);
app.use('/api/candidate', candidateRoute);
app.use('/api/employer', employerRoute);
    
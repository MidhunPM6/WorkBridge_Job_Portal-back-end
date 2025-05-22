import express from 'express';
import cors from 'cors';
import connectDB from './infrastructure/database/db.js';
import authRoute from './interface-adapter/routes/candidate/AuthRoute.js';
import cookieParser from 'cookie-parser';
import candidateRoute from './interface-adapter/routes/candidate/candidateRoute.js';
import employerRoute from './interface-adapter/routes/candidate/employerRoute.js';

export const app = express();

const allowedOrigins = [
  'http://localhost:3000',
  'https://work-bridge-sooty.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));

app.options('*', cors()); // handle preflight requests

app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Backend is running!');
});

app.use('/api/auth', authRoute);
app.use('/api/candidate', candidateRoute);
app.use('/api/employer', employerRoute);

import jwt from "jsonwebtoken";

import dotenv from 'dotenv';
dotenv.config();



export default class TokenService {
  constructor() {
    
    this.secretKey = process.env.JWT_SECRET_KEY;
    this.expiresIn = '7d';

    if (!this.secretKey) {
      throw new Error('JWT_SECRET_KEY is not defined in the environment variables');
    }
  }

  // Generate token
  generateToken(userId) {
    try {
      return jwt.sign({ userID: userId }, this.secretKey, {
        expiresIn: this.expiresIn
      });
    } catch (error) {
      console.error('Error generating token:', error.message);
      throw new Error('Failed to generate token');
    }
  }
}
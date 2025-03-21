import jwt from "jsonwebtoken";

import dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET  =  process.env.JWT_SECRET_KEY

export const  generateToken =(userid)=>{
    try {
        if (!JWT_SECRET) {
          throw new Error('JWT_SECRET is not defined in the environment variables');
        }
    
        const token = jwt.sign({ id: userid }, JWT_SECRET, {
          expiresIn: "1h"
        });
    
        return token;
    
      } catch (error) {
        console.error('Error generating token:', error.message);
        throw new Error('Failed to generate token');
      }
}

export const verifyToken = (token) => {
    return jwt.verify(token, JWT_SECRET);
  };
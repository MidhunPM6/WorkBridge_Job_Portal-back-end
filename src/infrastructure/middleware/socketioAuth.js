import jwt from 'jsonwebtoken';
import cookie from 'cookie';


export const socketAuthMiddleware = (socket, next) => {
    
    
  const cookies = socket.request.headers.cookie;
    
  if (!cookies) {
    return next(new Error('No cookies found'));
  }
  

  const parsedCookies = cookie.parse(cookies);
 
  
  const token = parsedCookies.jwt; 
  if (!token) {
    return next(new Error('No token found'));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    socket.user = decoded; 
        
    next();
  } catch (err) {
    console.error(err);
    return next(new Error('Invalid token'));
  }
};


import jwt from 'jsonwebtoken'

export const verifyToken = (req, res, next) => {
  const token = req.cookies.jwt

  if (!token) {
    return res.status(400).json({ message: 'Unauthorized token or invalid ' })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
    req.userID = decoded.userID
    req.userRole = decoded.role
    next()

  } catch (error) {
    console.error(error)
    return res.status(401).json({ message: 'Invalid or expired token' })
  }
}

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'your_jwt_secret_key'; // keep this secret and secure

interface DecodedToken {
  id: string;
  email: string;
  name: string;
  iat: number;
  exp: number;
}

export const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies?.token;

  if (!token) {
     res.status(401).json({ isLoggedIn: false, message: 'No token found.' });
     return
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as DecodedToken;

    req.user = decoded; // You can optionally attach user info to request
    next();
  } catch (error) {
     res.status(403).json({ isLoggedIn: false, message: 'Invalid or expired token.' });
     return
  }
};

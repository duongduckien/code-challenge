import dotenv from 'dotenv';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { UserRole } from '../enums/user.enum';

dotenv.config();

interface JwtPayload {
  id: number;
  email: string;
  role: UserRole;
}

const JWT_SECRET = process.env.JWT_SECRET || '';

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    req.user = decoded;
    next();
  } catch (e) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }
};

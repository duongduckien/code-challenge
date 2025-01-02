import { UserRole } from '../enums/user.enum';
import { NextFunction, Request, Response } from 'express';

export const isAdmin = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.user) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  if (req.user.role !== UserRole.ADMIN) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  next();
};

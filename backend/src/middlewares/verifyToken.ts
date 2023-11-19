import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({
      message: 'Unauthorized',
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
    if (typeof decoded === 'object' && 'userId' in decoded) {
      req.userId = decoded.userId;
    }
    next();
  } catch (error) {
    return res.status(403).json({
      message: 'Forbidden',
    });
  }
};

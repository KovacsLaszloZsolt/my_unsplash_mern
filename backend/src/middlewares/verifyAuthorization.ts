import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const verifyAuthorization = (req: Request, res: Response, next: NextFunction): void => {
  const bearerHeader = req.headers.authorization;

  console.log('run');
  if (!bearerHeader) {
    res.status(403).json({ error: 'missing authorization' });
    return;
  }

  const token = bearerHeader.split(' ')[1];

  const id = jwt.verify(token, process.env.JWT_PRIVATE_KEY || 'SupErSecret');
  res.locals.userId = id;
  next();
};

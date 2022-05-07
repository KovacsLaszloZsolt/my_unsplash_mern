import { Request, Response, NextFunction } from 'express';
import { JsonWebTokenError } from 'jsonwebtoken';
import multer from 'multer';

const errorHandler = (err: unknown, _req: Request, res: Response, _next: NextFunction): Response => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_UNEXPECTED_FILE') {
      return res.status(400).json({ error: 'not suported type' });
    }
  }
  if (err instanceof JsonWebTokenError) {
    return res.status(403).json({ error: 'invalid token' });
  }
  return res.status(500).send({ error: 'unknown error' });
};

export default errorHandler;

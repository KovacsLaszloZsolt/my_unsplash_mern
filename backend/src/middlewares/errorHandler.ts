import { Request, Response, NextFunction } from 'express';
import multer from 'multer';

const errorHandler = (err: unknown, _req: Request, res: Response, _next: NextFunction): void => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_UNEXPECTED_FILE') {
      res.status(400).json({ error: 'not suported type' });
    }
  }
  console.log(err);
  res.status(500).send({ error: 'unknown error' });
};

export default errorHandler;

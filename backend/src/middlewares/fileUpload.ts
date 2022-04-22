import { Request } from 'express';
import multer, { MulterError, StorageEngine } from 'multer';
import path from 'path';

const fileStorageEngine: StorageEngine = multer.diskStorage({
  destination: './tmp/',
  filename: (_req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const fileFilter = (_req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback): void => {
  // reject a file
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new MulterError('LIMIT_UNEXPECTED_FILE'));
  }
};

export const upload = multer({ storage: fileStorageEngine, fileFilter: fileFilter });

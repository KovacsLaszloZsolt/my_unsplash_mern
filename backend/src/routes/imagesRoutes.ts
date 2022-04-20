import { Router } from 'express';
import {
  deleteImage,
  getAllImages,
  getSingleImage,
  createImage,
  getSearchedImages,
} from '../controllers/imagesControllers';
import { upload } from '../middlewares/fileUpload';

export const imagesRouter = Router();

imagesRouter.get('/', getAllImages);
imagesRouter.get('/search', getSearchedImages);
imagesRouter.get('/:id', getSingleImage);
imagesRouter.post('/', upload.single('image'), createImage);

imagesRouter.delete('/:id', deleteImage);

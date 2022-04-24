import { Router } from 'express';
import { deleteImage, getAllImages, getSingleImage, createImages } from '../controllers/imagesControllers';
import { upload } from '../middlewares/fileUpload';

const imagesRouter = Router();

imagesRouter.get('/', getAllImages);
imagesRouter.get('/:id', getSingleImage);
imagesRouter.post('/', upload.array('images'), createImages);

imagesRouter.delete('/:id', deleteImage);

export default imagesRouter;

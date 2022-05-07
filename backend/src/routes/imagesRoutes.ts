import { Router } from 'express';
import { getAllImages, getSingleImage, createImages, getMyImages, deleteImage } from '../controllers/imagesControllers';
import { upload } from '../middlewares/fileUpload';
import { verifyAuthorization } from '../middlewares/verifyAuthorization';

const imagesRouter = Router();

imagesRouter.get('/', getAllImages);
imagesRouter.get('/my_images', verifyAuthorization, getMyImages);
imagesRouter.get('/:id', getSingleImage);
imagesRouter.post('/', upload.array('images'), createImages);

imagesRouter.delete('/:id', deleteImage);

export default imagesRouter;

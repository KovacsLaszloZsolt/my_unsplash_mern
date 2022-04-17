import { Router } from 'express';
import { deleteImage, getAllImages, getSingleImage, createImage } from '../controllers/imagesControllers';
import { upload } from '../middlewares/fileUpload';

export const imagesRouter = Router();
// getAllImage
// get /images

imagesRouter.get('/', getAllImages);
// getSingleImage
// get /images/:id
imagesRouter.get('/:id', getSingleImage);
// uploadNewImage
// post /images
imagesRouter.post('/', upload.single('image'), createImage);
// deleteImage
// delete /images/:id

imagesRouter.delete('/:id', deleteImage);

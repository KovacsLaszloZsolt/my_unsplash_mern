import { Request, Response } from 'express';
import { Image } from '../models/imageModel';
import { randomUUID } from 'crypto';
import bcrypt from 'bcryptjs';
import fs from 'fs';
import { promisify } from 'util';
// import sharp from 'sharp';
import cloudinary from '../config/cloudinary';

import { ImageType, ResImage } from '../interfaces';

const unlinkAsync = promisify(fs.unlink);

export const getAllImages = async (
  req: Request,
  res: Response,
): Promise<Response<unknown, Record<string, unknown>>> => {
  const search = req.query.label ? req.query.label : '';
  console.log(search);
  const skip = parseInt(req.query?.skip as string);
  const images: ImageType[] = (await Image.find({ label: { $regex: search, $options: 'i' } })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(5)) as ImageType[];
  return res.status(200).json(images.map((image) => setResImage(image)));
};

export const getSingleImage = async (
  req: Request,
  res: Response,
): Promise<Response<unknown, Record<string, unknown>>> => {
  const { id } = req.params as { id: string };
  const image: ImageType | null = await Image.findById(id);

  if (!image) {
    return res.status(404).send({ error: 'image not found' });
  }
  return res.status(200).json({ image: setResImage(image) });
};

export const createImages = async (
  req: Request,
  res: Response,
): Promise<Response<unknown, Record<string, unknown>>> => {
  const files = req.files as Express.Multer.File[];
  console.log(files);
  const { label, password } = req.body as { label: string; password: string | undefined };

  if (!files || !label) {
    return res.status(400).json({ error: 'missing required property' });
  }

  let hash: string;
  if (password) {
    const salt = await bcrypt.genSalt(10);
    hash = await bcrypt.hash(password, salt);
  }

  const uploadImage = async (files: Express.Multer.File[]): Promise<void> => {
    const promises = files.map(async (file) => {
      const uploadImage = await cloudinary.uploader.upload(file.path, { upload_preset: 'image_upload' });
      (await Image.create({
        _id: randomUUID(),
        label: label,
        password: hash,
        url: uploadImage.public_id,
        isProtected: hash ? true : false,
      })) as ImageType;

      await unlinkAsync(file.path);
    });
    await Promise.all(promises);
  };

  await uploadImage(files);
  return res.status(201).json();
};

export const deleteImage = async (req: Request, res: Response): Promise<Response<unknown, Record<string, unknown>>> => {
  const { id } = req.params as { id: string };
  const { password } = req.body as { password: string | undefined };
  const image: ImageType | null = await Image.findById(id);

  const isReqCorrect = async (password: string | undefined, hash: string | undefined): Promise<boolean> => {
    if ((hash && !password) || (!hash && password)) {
      return false;
    }

    if (password && hash && !(await bcrypt.compare(password, hash))) {
      return false;
    }

    return true;
  };

  if (!(await isReqCorrect(password, image?.password))) {
    return res.status(401).json({ error: 'invalid credital' });
  }

  const deletedImage = (await Image.findByIdAndDelete(id)) as ImageType;
  // console.log(deleteImage);
  await cloudinary.uploader.destroy(deletedImage.url, function (error, result) {
    console.log(result, error);
  });
  return res.status(200).json();
};

const setResImage = (image: ImageType): ResImage => {
  return {
    label: image.label,
    url: image.url,
    isProtected: image.isProtected,
    _id: image._id,
  };
};

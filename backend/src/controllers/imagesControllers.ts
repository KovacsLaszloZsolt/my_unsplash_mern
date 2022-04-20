import { Request, Response } from 'express';
import { Image } from '../models/imageModel';
import { randomUUID } from 'crypto';
import bcrypt from 'bcryptjs';
import sharp from 'sharp';

import { ImageType, ResImage } from '../interfaces';

export const getAllImages = async (
  req: Request,
  res: Response,
): Promise<Response<unknown, Record<string, unknown>>> => {
  const skip = parseInt(req.query?.skip as string);
  const images: ImageType[] = (await Image.find().sort({ createdAt: -1 }).skip(skip).limit(5)) as ImageType[];

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

export const createImage = async (req: Request, res: Response): Promise<Response<unknown, Record<string, unknown>>> => {
  const file = req.file;
  const { label, password } = req.body as { label: string; password: string | undefined };

  if (!file || !label) {
    return res.status(400).json({ error: 'missing required property' });
  }

  await sharp(file.path).resize(350).toFile(`${file.destination}/review_${file.filename}`);

  const host = req.header('host') as string;
  const filePath = file?.path;

  let hash;
  if (password) {
    const salt = await bcrypt.genSalt(10);
    hash = await bcrypt.hash(password, salt);
  }

  const reviewUrl = new URL(`http://${host}/${process.env.UploadFilesFolder as string}/review_${file.filename}`);

  const image = (await Image.create({
    _id: randomUUID(),
    label: label,
    password: hash,
    url: `http://${host}/${filePath}`,
    reviewUrl: reviewUrl,
    isProtected: hash ? true : false,
  })) as ImageType;

  return res.status(201).json({ image: setResImage(image) });
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

  await Image.findByIdAndDelete(id);
  return res.status(200).json();
};

export const getSearchedImages = async (
  req: Request,
  res: Response,
): Promise<Response<unknown, Record<string, unknown>>> => {
  const search = req.query.label;
  const searchedImages: ImageType[] | null = await Image.find({ label: { $regex: search, $options: 'i' } });

  return res.status(200).json(searchedImages.map((image) => setResImage(image)));
};

const setResImage = (image: ImageType): ResImage => {
  return {
    label: image.label,
    url: image.url,
    reviewUrl: image.reviewUrl,
    isProtected: image.isProtected,
    _id: image._id,
  };
};

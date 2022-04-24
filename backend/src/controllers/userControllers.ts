import { Request, Response } from 'express';
import { randomUUID } from 'crypto';
import { User } from '../models/userModel';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

type UserType = {
  _id: string;
  email: string;
  password: string;
};

export const register = async (req: Request, res: Response): Promise<Response> => {
  const { email, password, confirmPassword } = req.body as {
    email: string;
    password: string;
    confirmPassword: string;
  };

  if (!email || !password) {
    return res.status(400).json({ error: 'Missing required field' });
  }

  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!regex.test(email)) {
    return res.status(400).json({ error: 'invalid email' });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ error: 'invalid password' });
  }

  const user: UserType | null = await User.findOne({ email: email });

  if (user) {
    return res.status(409).json({ error: 'user already exist' });
  }

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  const newUser = (await User.create({
    _id: randomUUID(),
    email: email,
    password: hashPassword,
    active: false,
  })) as UserType | null;

  if (!newUser) {
    return res.status(400).json({ error: 'User not created' });
  }

  return res.status(201).json({ msg: 'user created' });
};

export const login = async (req: Request, res: Response): Promise<Response> => {
  const { email, password } = req.body as { email: string; password: string };

  const user: UserType | null = await User.findOne({ email: email });

  if (!user || !password) {
    return res.status(401).json({ error: 'invalid login credential' });
  }

  const verifyUser = await bcrypt.compare(password, user.password);

  if (!verifyUser) {
    return res.status(401).json({ error: '"invalid login credential"' });
  }

  return res
    .status(200)
    .json({ token: jwt.sign(user._id, process.env.JWT_PRIVATE_KEY || 'SupErSecret'), id: user._id });
};

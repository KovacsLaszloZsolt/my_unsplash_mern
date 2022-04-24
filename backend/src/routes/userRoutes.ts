import { Router } from 'express';
import { login, register } from '../controllers/userControllers';
import { User } from '../models/userModel';

const userRouter = Router();

userRouter.post('/login', login);

userRouter.post('/register', register);
export default userRouter;

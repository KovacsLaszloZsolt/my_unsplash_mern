import 'dotenv/config';
import express from 'express';
import 'express-async-errors';
import morgan from 'morgan';
import errorHandler from './middlewares/errorHandler';
import { imagesRouter } from './routes/imagesRoutes';
import cors from 'cors';
export const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static('files'));
app.use(morgan('tiny'));
app.use('/images', imagesRouter);
app.use(errorHandler);
app.use('*', (_req, res) => {
  return res.status(404).send({ error: 'not found' });
});

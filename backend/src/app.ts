import 'dotenv/config';
import express, { Request, Response } from 'express';
import 'express-async-errors';
import morgan from 'morgan';
import errorHandler from './middlewares/errorHandler';
import { imagesRouter } from './routes/imagesRoutes';
import cors from 'cors';
import path from 'path';

export const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static('files'));
app.use(morgan('tiny'));
app.use('/images', imagesRouter);
app.use(errorHandler);

// serve static folder if production
if (process.env.NODE_ENV === 'production') {
  // set static folder
  app.use(express.static('../../frontend/build'));
  app.get('/', (req: Request, res: Response) => {
    res.sendFile(path.resolve(__dirname, '../../', 'frontend', 'build', 'index.html'));
  });
}

app.use('*', (_req, res) => {
  return res.status(404).send({ error: 'not found' });
});

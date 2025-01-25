/* eslint-disable @typescript-eslint/no-explicit-any */
import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import globalErrorHandler from './app/middlwares/globalErrorHandler';
import notFound from './app/middlwares/notFound';
import router from './app/routes';
import cookieParser from 'cookie-parser';

const app: Application = express();

// Perser
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const test = async(res: Response) => {
  const a = 10;
  res.send(a)
}
app.get('/', test);
// Application routes
app.use('/api/v1', router)


// User middlwares

// Add global error handler middlwares
app.use(globalErrorHandler as (err: any, req: Request, res: Response, next: NextFunction) => void);
// Add not found middlwares
app.use(notFound as (req: Request, res: Response, next: NextFunction) => void);

export default app;

/* eslint-disable @typescript-eslint/no-explicit-any */
import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import globalErrorHandler from './app/middlwares/globalErrorHandler';

const app: Application = express();

// Perser
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// User middlwares
app.use(globalErrorHandler as (err: any, req: Request, res: Response, next: NextFunction) => void);

export default app;

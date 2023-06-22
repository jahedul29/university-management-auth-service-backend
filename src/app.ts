import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { globalErrorHandling } from './app/middlewares/gobalErrorHandling.middleware';
import appRouter from './app/routes';

const app: Application = express();

// cors setup
app.use(cors());

// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
app.get('/api/v1', async (req: Request, res: Response, next: NextFunction) => {
  res.send('Hello from University management auth service backend');
});

// app routes
app.use('/api/v1', appRouter);

//middlewars
app.use(globalErrorHandling);

//not found route
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: `${req.originalUrl} route not found`,
    errorMessages: [
      {
        path: req.originalUrl,
        message: `${req.originalUrl} route not found`,
      },
    ],
  });

  next();
});

export default app;

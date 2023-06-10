import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import { globalErrorHandling } from './app/middlewares/gobalErrorHandling.middleware';
import { UserRouters } from './app/modules/users/user.route';

const app: Application = express();

// cors setup
app.use(cors());

// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
app.get('/api/v1', async (req: Request, res: Response, next: NextFunction) => {
  res.send('Hello from University management auth service backend');
  // throw new ApiError(400, 'Some error');
  // await Promise.reject(new Error('Unhandled promise rejection'));
  // next(new ApiError(400, 'Some error'));
});

// app routes
app.use('/api/v1/users', UserRouters);

//middlewars
app.use(globalErrorHandling);

export default app;

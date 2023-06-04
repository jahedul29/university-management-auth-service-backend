import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import userRouter from './app/modules/users/users.route';

const app: Application = express();

// cors setup
app.use(cors());

// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app routes
app.use('/api/v1/users', userRouter);

app.get('/api/v1', (req: Request, res: Response) => {
  res.send('Hello from University management auth service backend');
});

export default app;

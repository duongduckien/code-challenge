import express from 'express';
import { errorHandler } from './middlewares/error.middleware';
import userRouter from './modules/user/user.router';

const app = express();
app.use(express.json());

app.use('/user', userRouter);

app.use(errorHandler);

export default app;

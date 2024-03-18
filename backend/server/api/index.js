import express from 'express';
import { authRouter } from '../../routes/auth.js';
import { userRouter } from '../../routes/user.js';
import { jobRouter } from '../../routes/job.js';
import { jobBoardRouter } from '../../routes/jobBoard.js';

const app = express.Router();

app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/jobs', jobRouter);
app.use('/jobboard', jobBoardRouter);

export {
  app as apiRouter
};
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import session from 'express-session';
import ConnectPg from 'connect-pg-simple';
import { authRouter } from '../routes/auth.js';
import { userRouter } from '../routes/user.js';
import { jobRouter } from '../routes/job.js';
import { pgPool, migrate } from '../db/db.js';

const pgSession = ConnectPg(session);

dotenv.config();
const app = express();
migrate();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { PORT, session_secret, node_env } = process.env;

const port = PORT || 5000;

app.use(session({
  store: new pgSession({
  pool: pgPool,
  tableName: 'sessions',
  }),
  secret: session_secret,
  cookie: {
    sameSite: 'strict',
    httpOnly: true,
    maxAge: 24 * 12 * 60 * 100
  },
  resave: false,
  saveUninitialized: false,
}));

if (node_env === 'production') {
  app.set('trust proxy', 1);
  session.cookie.secure = true;
}

app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/jobs', jobRouter);

app.listen(port, "0.0.0.0", () => {
  console.log(`App is listening on Port ${port}`);
});
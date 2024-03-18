import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import expressSession from 'express-session';
import ConnectPg from 'connect-pg-simple';
import { pgPool, migrate } from '../db/db.js';
import { apiRouter } from './api/index.js';

dotenv.config();
const app = express();
migrate();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

const { PORT, session_secret, node_env } = process.env;
const port = PORT || 5000;

app.listen(port, () => {
  console.log(`App is listening on Port ${port}`);
});

const pgSession = ConnectPg(expressSession);

const session = {
  store: new pgSession({
  pool: pgPool,
  tableName: 'sessions',
  }),
  secret: session_secret,
  cookie: {
    sameSite: 'lax',
    httpOnly: false,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    secure: false
  },
  resave: false,
  saveUninitialized: false,
}

if (node_env === 'production') {
  app.set('trust proxy', 1);
  session.cookie.secure = true;
}

app.use(expressSession(session));
app.use('/api', apiRouter);

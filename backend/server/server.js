import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import session from 'express-session';
import ConnectPg from 'connect-pg-simple';
import { authRouter } from '../routes/auth.js';
import { userRouter } from '../routes/user.js';
import { pgPool, migrate } from '../db/db.js';

const pgSession = ConnectPg(session);

dotenv.config();
const app = express();
migrate();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { appKey, appId, PORT, session_secret, node_env } = process.env;

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

app.get("/jobs", async (req, res) => {
  try {
    const response = await fetch(`https://api.adzuna.com/v1/api/jobs/us/search/1?app_id=${appId}&app_key=${appKey}&results_per_page=10&what=javascript%20developer`,{
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    });
    const data = await response.json();
    const jobs = data.results;

    const filtered = jobs.map(job => {
      return {
        category: job.category.label,
        companyName: job.company.display_name,
        contractType: job.contract_type,
        created: job.created,
        description: job.description,
        locationName: job.location.display_name,
        redirectUrl: job.redirect_url
      }
    });
    res.json({ jobs: filtered });
  } catch(err) {
    console.log(err);
  }
});

app.listen(port, "0.0.0.0", () => {
  console.log(`App is listening on Port ${port}`);
});
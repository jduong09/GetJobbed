import express from 'express';
import dotenv from 'dotenv';
import { createJob } from '../server/actions/jobs.js';

dotenv.config();
const app = express.Router();

app.post('/new', async (req, res) => {
  const { name, position, status, email } = req.body;
  const { user_id } = req.session.userInfo;
  try {
    const response = await createJob({ name, position, status, user_id, email });
    if (response.id) {
      res.json({ requestStatus: 200 });
    } else {
      res.json({ requestStatus: 400 });
    }
  } catch (err) {
    console.log(err);
  }
  res.end();
});

export {
  app as jobRouter
};
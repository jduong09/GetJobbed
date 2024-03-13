import express from 'express';
import dotenv from 'dotenv';
import { createJob } from '../server/actions/jobs.js';

dotenv.config();
const app = express.Router();

app.get('/:user_uuid', async (req, res) => {

});

app.post('/new', async (req, res) => {
  const { name, position, status, email } = req.body;
  console.log(req.session);
  const { user_id } = req.session.userInfo;
  try {
    const response = await createJob({ name, position, status, user_id, email });
    const data = response.json();
    console.log(data);
  } catch (err) {
    console.log(err);
  }
  res.end();
});

export {
  app as jobRouter
};
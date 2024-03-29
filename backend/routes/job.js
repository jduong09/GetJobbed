import express from 'express';
import dotenv from 'dotenv';
import { createJob, getJobByUuid, editJob, deleteJobByUuid } from '../server/actions/jobs.js';

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

app.get('/:job_uuid', async (req, res) => {
  const { job_uuid } = req.params;
  try {
    const response = await getJobByUuid(job_uuid);
    res.json({ data: response });
  } catch(err) {
    console.log(err);
  }
});

app.patch('/edit', async (req, res) => {
  const { name, position, status, job_uuid } = req.body;

  try {
    const response = await editJob({ name, position, status, job_uuid });
    
    if (response.id) {
      res.json({ requestStatus: 200 });
    } else {
      res.json({ requestStatus: 400 });
    }
  } catch(err) {
    console.log(err);
  }
  res.end();
});

app.delete('/:job_uuid', async (req, res) => {
  const { job_uuid } = req.params;
  try {
    const response = await deleteJobByUuid(job_uuid);
    res.json({ data: response });
  } catch(err) {
    console.log(err);
    res.end();
  }
});

export {
  app as jobRouter
};
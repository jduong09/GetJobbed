import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { authRouter } from '../routes/auth.js';
import { migrate } from '../db/db.js';

dotenv.config();
const app = express();
migrate();
app.use(cors());

const { appKey, appId, PORT } = process.env;

const port = PORT || 5000;

app.use('/auth', authRouter);

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
})

app.listen(port, "0.0.0.0", () => {
  console.log(`App is listening on Port ${port}`);
});
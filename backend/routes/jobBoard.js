import express from 'express';
import dotenv from 'dotenv';

dotenv.config();
const app = express.Router();

const { app_key, app_id } = process.env

app.get("/", async (req, res) => {
  try {
    const response = await fetch(`https://api.adzuna.com/v1/api/jobs/us/search/1?app_id=${app_id}&app_key=${app_key}&results_per_page=10&what=javascript%20developer`,{
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
        locationName: job.location.area[2] ? `${job.location.area[2]}, ${job.location.area[1]}` : `${job.location.area[1]}`,
        redirectUrl: job.redirect_url
      }
    });
    res.json({ jobs: filtered });
  } catch(err) {
    console.log(err);
  }
});

// Query by location (zipcode, city and state)
app.post('/filter', async (req, res) => {
  const { filter, jobTitle } = req.body;

  const jobTitleParam = jobTitle.split(" ").join("%20");
  const fetchUrl = filter.length 
    ? `https://api.adzuna.com/v1/api/jobs/us/search/1?app_id=${app_id}&app_key=${app_key}&results_per_page=10&what=${jobTitleParam}&where=${filter}&distance=100`
    : `https://api.adzuna.com/v1/api/jobs/us/search/1?app_id=${app_id}&app_key=${app_key}&results_per_page=10&what=${jobTitleParam}`;
  try {
    const response = await fetch(fetchUrl, {
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
        locationName: job.location.area[2] ? `${job.location.area[2]}, ${job.location.area[1]}` : `${job.location.area[1]}`,
        redirectUrl: job.redirect_url
      }
    });
    res.json({ jobs: filtered });
  } catch(err) {
    console.log(err);
  }
});

export {
  app as jobBoardRouter
};
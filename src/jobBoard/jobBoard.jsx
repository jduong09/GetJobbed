import { useEffect, useState } from 'react';

export const JobBoard = () => {
  const [jobs, setJobs] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const getJobs = async () => {
      try {
        const response = await fetch('http://localhost:5000/jobs', {
          method: 'GET',
          headers: {
            'Access-Control-Allow-Origin': '*'
          }
        });
        const data = await response.json();
        console.log(data);
        setJobs(data.jobs);
      } catch (err) {
        console.log(err);
      }
    };
    getJobs();
  }, []);

  const jobListItems = jobs.map((job, idx) => {
    return (<li className='list-item-job' key={idx}>
      <div className='job-header'>
        <h2>{job.companyName}</h2>
        <span>{job.created}</span>
        <ul>
          <li>{job.locationName}</li>
          <li>{job.category}</li>
        </ul>
      </div>
      <a href={job.redirectUrl} target="_blank">Listing</a>
    </li>);
  });

  const handleChange = (e) => {
    setFilter(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (filter.length === 0) {
      return;
    } 

    const fetchJobsByLocation = async () => {
      try {
        const response = await fetch('http://localhost:5000/jobs/location', {
          method: 'POST',
          body: {
            filter
          }
        });

        const data = response.json();
        setJobs(data.jobs);
      } catch(err) {
        console.log(err);
      }
    }

    fetchJobsByLocation();
  }

  return (
    <div id="div-job-board">
      <div>
        <h2>Job Board</h2>
        <div>
          <form id="form-job-filter">
            <label htmlFor='job-filter'>
              Location:
              <input type="text" id="input-job-filter" name="job-filter" placeholder="zipcode, city & state..." onChange={handleChange} value={filter}/>
            </label>
            <button type="button" id="btn-filter-submit" onClick={handleSubmit}>Submit</button>
          </form>
        </div>
      </div>
      <ul id="list-jobs">{jobListItems}</ul>
    </div>
  )
}

/*
<div>{job.description}</div>
*/
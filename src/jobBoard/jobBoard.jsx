import { useEffect, useState } from 'react';

export const JobBoard = () => {
  const [jobs, setJobs] = useState([]);

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
      <div>{job.description}</div>
      <a href={job.redirectUrl} target="_blank">Listing</a>
    </li>);
  }); 

  return (
    <div>
      <h2>Job Board</h2>
      <ul id="list-jobs">{jobListItems}</ul>
    </div>
  )
}
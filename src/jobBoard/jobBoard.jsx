import { useEffect, useState } from 'react';

export const JobBoard = () => {
  const [jobs, setJobs] = useState([]);
  const [filter, setFilter] = useState("");
  const [jobTitle, setJobTitle] = useState("JavaScript Developer");

  useEffect(() => {
    const getJobs = async () => {
      try {
        const response = await fetch('/api/jobboard', {
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

  const handleChange = (e) => {
    setFilter(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (filter.length === 0) {
      return;
    }

    fetchJobs();
  }

  const handleJobTitleChange = (title, e) => {
    e.preventDefault();

    // User clicked on already selected title, do nothing.
    if (title === jobTitle) {
      return;
    }

    setJobTitle(title);
    fetchJobs();
  }

  const fetchJobs = async () => {
    const bodyData = {
      filter,
      jobTitle
    };

    try {
      const response = await fetch('http://localhost:5000/jobboard/filter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyData)
      });
      const data = await response.json();
      console.log(data);
      setJobs(data.jobs);
    } catch(err) {
      console.log(err);
    }
  }

  const jobListItems = jobs.map((job, idx) => {
    return (<li className='list-item-job' key={idx}>
      <div className='job-header'>
        <h2>{job.companyName}</h2>
        <span>{new Date(job.created).toLocaleDateString()}</span>
        <ul>
          <li>{job.locationName}</li>
          <li>{job.category}</li>
        </ul>
      </div>
      <a href={job.redirectUrl} target="_blank">Listing</a>
    </li>);
  });

  return (
    <div id="div-job-board">
        <div id="div-job-board-header">
          <ul id="list-job-keywords">
            <li>
              <button type="button" className={jobTitle === 'JavaScript Developer' ? 'active' : ''} onClick={(e) => handleJobTitleChange('JavaScript Developer', e)}>JavaScript</button>
            </li>
            <li>
              <button type="button" className={jobTitle === 'Frontend Developer' ? 'active' : ''} onClick={(e) => handleJobTitleChange('Frontend Developer', e)}>Frontend</button>
            </li>
            <li>
              <button type="button" className={jobTitle === 'Backend Developer' ? 'active' : ''} onClick={(e) => handleJobTitleChange('Backend Developer', e)}>Backend</button>
            </li>
            <li>
              <button type="button" className={jobTitle === 'Fullstack Developer' ? 'active' : ''} onClick={(e) => handleJobTitleChange('Fullstack Developer', e)}>Fullstack</button>
            </li>
            <li>
              <button type="button" className={jobTitle === 'Quality Assurance' ? 'active' : ''} onClick={(e) => handleJobTitleChange('Quality Assurance', e)}>Quality Assurance</button>
            </li>
          </ul>
          <form id="form-job-filter">
            <label htmlFor='input-job-filter'>
              Location:
              <input type="text" id="input-job-filter" name="job-filter" placeholder="zipcode, city & state..." onChange={handleChange} value={filter}/>
            </label>
            <button type="button" id="btn-filter-submit" onClick={handleSubmit}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 512 512"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" fill='000000'/></svg>
            </button>
          </form>
        </div>
      {jobListItems.length ? <ul id="list-jobs">{jobListItems}</ul> : <div>No Jobs Found</div>}
    </div>
  )
}
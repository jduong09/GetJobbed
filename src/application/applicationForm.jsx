import { useState } from 'react';
import PropTypes from 'prop-types';

export const ApplicationForm = ({ isOpen, handleCloseClick, user_uuid }) => {
  const [companyName, setCompanyName] = useState("");
  const [position, setPosition] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(0);

  const handleChange = (formInput, e) => {
    if (formInput === 'name') {
      setCompanyName(e.target.value);
    } else if (formInput === 'position') {
      setPosition(e.target.value);
    } else if (formInput === 'email') {
      setEmail(e.target.value);
    } else if (formInput === 'status') {
      setStatus(e.target.value);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const fetchJob = async () => {
      const bodyData = {
        name: companyName,
        position,
        email,
        status,
        user_uuid: user_uuid
      };
      try {
        const response = await fetch(`/api/jobs/new`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(bodyData)
        });
        const data = response.json();
        console.log(data);
      } catch(err) {
        console.log(err);
      }
    }
    fetchJob();
  }

  return (
    <div className={isOpen === true ? '' : 'hide'} id="div-application-form">
      <div id="form-header">
        <h2>Add Application</h2>
        <button type="button" id="btn-modal-close" onClick={handleCloseClick}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 384 512"><path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z"/></svg>
        </button>
      </div>
      <form id="form-application-create">
        <label htmlFor='input-company-name'>
          Company Name
          <input type='text' id='input-company-name' name='company-name' onChange={(e) => handleChange('name', e)} value={companyName} />
        </label>
        <label htmlFor='input-job-position'>
          Job Title
          <input type='text' id='input-job-position' name='job-position' onChange={(e) => handleChange('position', e)} value={position} />
        </label>
        <label htmlFor='input-email'>
          Email
          <input type='email' id='input-email' name='email' onChange={(e) => handleChange('email', e)} value={email} />
        </label>
        <label htmlFor='status-select'>
          Application Status:
          <select value={status} id="status-select" name='status-select' onChange={(e) => handleChange('status', e)}>
            <option value={0}>Applied</option>
            <option value={1}>Received Offer</option>
            <option value={2}>Rejected</option>
          </select>
        </label>
        <button onClick={handleSubmit} id="btn-submit">Add Job</button>
      </form>
    </div>
  )
};

ApplicationForm.propTypes = {
  isOpen: PropTypes.bool,
  handleCloseClick: PropTypes.func,
  user_uuid: PropTypes.string,
}
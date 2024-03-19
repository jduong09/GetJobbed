import { useState, useRef } from 'react';
import PropTypes from 'prop-types';

const ApplicationForm = ({ isOpen, handleCloseClick, user_uuid }) => {
  const [companyName, setCompanyName] = useState("");
  const [position, setPosition] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(0);
  const [errorMessageName, setErrorMessageName] = useState("Company name is required");
  const [errorMessagePosition, setErrorMessagePosition] = useState("Company position is required");
  const errorNameRef = useRef(null);
  const errorPositionRef = useRef(null);

  const handleChange = (formInput, e) => {
    if (formInput === 'name') {
      setCompanyName(e.target.value);
    } else if (formInput === 'position') {
      setPosition(e.target.value);
    } else if (formInput === 'email') {
      setEmail(e.target.value);
    } else if (formInput === 'status') {
      console.log('Setting Select Status');
      console.log(parseInt(e.target.value));
      setStatus(parseInt(e.target.value));
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    /* Client-side Form Validation on input:companyname input:position */
    if (!companyName.length && !position.length) {
      setErrorMessageName("Company Name is required");
      setErrorMessagePosition("Company position is required");
      errorNameRef.current.classList.remove('hide');
      errorPositionRef.current.classList.remove('hide');
      return;
    } else if (!companyName.length) {
      setErrorMessageName("Company Name is required");
      errorNameRef.current.classList.remove('hide');
      errorPositionRef.current.classList.add('hide');
      return;
    } else if (!position.length) {
      // insert error handling.
      setErrorMessagePosition("Company position is required");
      errorNameRef.current.classList.add('hide');
      errorPositionRef.current.classList.remove('hide');
      return;
    } else {
      errorNameRef.current.classList.add('hide');
      errorPositionRef.current.classList.add('hide');
    }
    
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
        const { requestStatus } = await response.json();
        console.log(requestStatus);
        if (requestStatus === 200) {
          setCompanyName("");
          setPosition("");
          setEmail("");
          setStatus(0);
        } else if (requestStatus === 400) {
          console.log('no yay');
          /* Need to handle server-side error. */
        }
        handleCloseClick(e);
        return;
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
          <input type='text' id='input-company-name' name='company-name' onChange={(e) => handleChange('name', e)} value={companyName} required/>
        </label>
        <span ref={errorNameRef} className={`span-error-message hide`}>{errorMessageName}</span>
        <label htmlFor='input-job-position'>
          Job Title
          <input type='text' id='input-job-position' name='job-position' onChange={(e) => handleChange('position', e)} value={position} required/>
        </label>
        <span ref={errorPositionRef} className='span-error-message hide'>{errorMessagePosition}</span>
        <label htmlFor='input-email'>
          Email
          <input type='email' id='input-email' name='email' onChange={(e) => handleChange('email', e)} value={email} />
        </label>
        <label htmlFor='status-select'>
          Application Status:
          <select value={status} id="status-select" name='status-select' onChange={(e) => handleChange('status', e)} required>
            <option value="0">Applied</option>
            <option value="1">Received Offer</option>
            <option value="2">Rejected</option>
          </select>
        </label>
        <button type="button" onClick={handleSubmit} id="btn-submit">Add Job</button>
      </form>
    </div>
  )
};

export default ApplicationForm;

ApplicationForm.propTypes = {
  isOpen: PropTypes.bool,
  handleCloseClick: PropTypes.func,
  user_uuid: PropTypes.string,
}
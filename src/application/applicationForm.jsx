import { useState } from 'react';

const ApplicationForm = ({ user_uuid }) => {
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(0);

  const handleNameChange = (e) => {
    setCompanyName(e.target.value);
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  }

  return (
    <div id="div-application-form">
      <form id="form-application-create">
        <label htmlFor='company-name'>
          Company Name
          <input type='text' id='input-company-name' name='company-name' onChange={handleNameChange} value={companyName} />
        </label>
        <label htmlFor='email'>
          Email
          <input type='email' id='input-email' name='email' onChange={handleEmailChange} value={email} />
        </label>
        <label htmlFor='status-select'>
          Application Status
          <select value={status} name='status-select' onChange={handleStatusChange}>
            <option value={0}>Applied</option>
            <option value={1}>Received Offer</option>
            <option value={2}>Rejected</option>
          </select>
        </label>
      </form>
    </div>
  )
}
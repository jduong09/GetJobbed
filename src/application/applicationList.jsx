import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const ApplicationList = ({ user_uuid, setApplicationFormData, handleOpenModal }) => {
  const [applications, setApplications] = useState([]);
  useEffect(() => {
    const fetchAllApplications = async () => {
      try {
        const response = await fetch(`/api/users/${user_uuid}/jobs`, {
          method: 'GET'
        });
        const data = await response.json();
        setApplications(data.jobsArray);
      } catch(err) {
        console.log(err);
      }
    }
    fetchAllApplications();
  });

  const handleEdit = (e) => {
    e.preventDefault();
    const job_uuid = e.currentTarget.parentElement.getAttribute('data-uuid');

    const fetchApplicationInfo =  async (job_uuid) => {
      const response = await fetch(`/api/jobs/${job_uuid}`, {
        method: 'GET'
      });
      const { data } = await response.json();
      console.log(data);
      /* { name, position, application_status } */
      await setApplicationFormData(data);
      handleOpenModal(e);
    }
    fetchApplicationInfo(job_uuid);
  }

  const rowsBodyTable = applications.map((application, idx) => {
    let statusText;
    if (application.application_status === 0) {
      statusText = 'Applied';
    } else if (application.application_status === 1) {
      statusText = 'Received Offer';
    } else if (application.application_status === 2) {
      statusText = 'Rejected';
    }

    return (
      <li className='list-item-application' key={idx} data-uuid={application.job_uuid}>
        <h3>{application.name}</h3>
        <button onClick={handleEdit}>
          <svg className='svg-edit-btn' xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 512 512"><path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"/></svg>
        </button>
        <h4>{application.position}</h4>
        <span>{statusText}</span>
      </li>
    );
  });
  
  return (
    <div id="div-applications">
      <ul>{rowsBodyTable}</ul>
    </div>
  );
};

export default ApplicationList;

ApplicationList.propTypes = {
  user_uuid: PropTypes.string,
  setApplicationFormData: PropTypes.func,
  handleOpenModal: PropTypes.func
}
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const ApplicationList = ({ user_uuid }) => {
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
  }, []);

  const listApplications = applications.map((application, idx) => {
    let statusText;
    if (application.application_status === 0) {
      statusText = 'Applied';
    } else if (application.application_status === 1) {
      statusText = 'Received Offer';
    } else if (application.application_status === 2) {
      statusText = 'Rejected';
    }

    return (
      <li key={idx} className='list-item-application'>
        <h3>{application.name}</h3>
        <div>{application.position}</div>
        <div>{statusText}</div>
      </li>
    );
  });
  
  return (
    <div id="div-applications">
      <ul id="list-applications">{applications.length && listApplications}</ul>
    </div>
  );
};

export default ApplicationList;

ApplicationList.propTypes = {
  user_uuid: PropTypes.string,
}
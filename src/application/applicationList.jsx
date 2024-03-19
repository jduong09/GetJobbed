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
  });

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
      <tr key={idx}>
        <th scope="row">{application.name}</th>
        <td>{application.position}</td>
        <td>{statusText}</td>
      </tr>
    );
  });
  
  return (
    <div id="div-applications">
      <table>
        <thead>
          <tr>
            <th scope="col">Company Name</th>
            <th scope="col">Position</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>{rowsBodyTable}</tbody>
      </table>
    </div>
  );
};

export default ApplicationList;

ApplicationList.propTypes = {
  user_uuid: PropTypes.string,
}
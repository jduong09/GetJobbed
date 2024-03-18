import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ApplicationForm } from '../application/applicationForm';

const ApplicationsPage = () => {
  const { user_uuid } = useParams();
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
    <div>
      <header>
        <h1>Insert Logo Here</h1>
        <h2>Your Applications</h2>
        <nav>

        </nav>
      </header>
      <main>
        <div id="div-applications">
          <ul id="list-applications">{applications.length && listApplications}</ul>
        </div>
      </main>
    </div>
  );
}

export default ApplicationsPage;
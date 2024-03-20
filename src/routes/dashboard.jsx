/* add useEffect to react import when using it again */
import { useState } from 'react';
import { JobBoard } from '../jobBoard/jobBoard';
import ApplicationForm from '../application/applicationForm';
import ApplicationList from '../application/applicationList';
import { useParams } from 'react-router-dom';

const Dashboard = () => {
  const { user_uuid } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [showApplications, setShowApplications] = useState(false);
  const [applicationFormData, setApplicationFormData] = useState({});
  /*
  useEffect(() => {

    const fetchFilteredEmails = async () => {
      const response = await fetch(`/api/users/${user_uuid}/messages`, {
        method: 'GET'
      });
      const data = response.json();
      console.log(data);
    }
    // fetchFilteredEmails();
  }, []);
  */

  const handleLogOut = async () => {
    try {
      await fetch(`/api/auth/logout`, {
        method: 'POST'
      });
      // send user to homepage on logout. (Unprotected page).
      window.location = 'http://localhost:5173';
    } catch(err) { 
      console.log(err);
    }
  }

  const handleOpenModal = (e) => {
    e.preventDefault();
    setIsOpen(true)
  }

  const handleCloseClick = (e) => {
    e.preventDefault();
    setIsOpen(false);
  }
  console.log('Application Form Data: ', applicationFormData);

  return (
    <div>
      <header>
        <h1>Insert Logo Here.</h1>
        <h2>Dashboard</h2>
        <nav>
          <button type="button" onClick={handleOpenModal}>Add Application</button>
          <button type="button" onClick={handleLogOut}>Sign Out.</button>
        </nav>
      </header>
      <main>
        <div id="div-dashboard">
          <div>
            <button type="button" onClick={() => setShowApplications(false)}>Jobs</button>
            <button type="button" onClick={() => setShowApplications(true)}>Applications</button>
          </div>
          {!showApplications ? <JobBoard /> : <ApplicationList user_uuid={user_uuid} setApplicationFormData={setApplicationFormData} handleOpenModal={handleOpenModal} />}
        </div>
        <ApplicationForm isOpen={isOpen} handleCloseClick={handleCloseClick} user_uuid={user_uuid} applicationFormData={applicationFormData} />
      </main>
    </div>
  );
};

export default Dashboard;
/* add useEffect to react import when using it again */
import { useEffect, useState } from 'react';
import { JobBoard } from '../jobBoard/jobBoard';
import ApplicationForm from '../application/applicationForm';
import ApplicationList from '../application/applicationList';
import { useParams } from 'react-router-dom';

const Dashboard = () => {
  const { user_uuid } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [showApplications, setShowApplications] = useState(false);
  const [applicationFormData, setApplicationFormData] = useState({});
  const [editStatus, setEditStatus] = useState(false);
  const [loading, setLoading] = useState(false);

  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetchAllApplications();
    /*
    const fetchFilteredEmails = async () => {
      const response = await fetch(`/api/users/${user_uuid}/messages`, {
        method: 'GET'
      });
      const data = response.json();
      console.log(data);
    }
    fetchFilteredEmails();
    */
  }, [editStatus, loading]);

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

  const toggleLoadingState = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }

  const renderMainComponent = () => {
    if (loading) {
      return (
        <div>
          <svg className='spin' xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 512 512"><path d="M304 48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm0 416a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM48 304a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm464-48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM142.9 437A48 48 0 1 0 75 369.1 48 48 0 1 0 142.9 437zm0-294.2A48 48 0 1 0 75 75a48 48 0 1 0 67.9 67.9zM369.1 437A48 48 0 1 0 437 369.1 48 48 0 1 0 369.1 437z"/></svg>
          Loading...
        </div>
      );
    }
    
    if (!showApplications) {
      return <JobBoard setLoading={setLoading} />;
    } else {
      return <ApplicationList setLoading={setLoading} fetchAllApplications={fetchAllApplications} applications={applications} user_uuid={user_uuid} setApplicationFormData={setApplicationFormData} handleOpenModal={handleOpenModal} setEditStatus={setEditStatus} />;
    }
  }

  const clickJobTab = (e) => {
    e.preventDefault()
    toggleLoadingState();
    setShowApplications(false);
  }

  const clickApplicationTab = (e) => {
    e.preventDefault();
    toggleLoadingState();
    setShowApplications(true);
  }

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
            <button type="button" onClick={clickJobTab}>Jobs</button>
            <button type="button" onClick={clickApplicationTab}>Applications</button>
          </div>
          {renderMainComponent()}
        </div>
        <ApplicationForm editStatus={editStatus} fetchAllApplications={fetchAllApplications} setEditStatus={setEditStatus} isOpen={isOpen} handleCloseClick={handleCloseClick} user_uuid={user_uuid} applicationFormData={applicationFormData} />
      </main>
    </div>
  );
};

export default Dashboard;
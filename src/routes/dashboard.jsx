import { useEffect, useState } from 'react';
import { JobBoard } from '../jobBoard/jobBoard';
import { ApplicationForm } from '../application/applicationForm';
import { useParams } from 'react-router-dom';


const Dashboard = () => {
  const { user_uuid } = useParams();
  const [isOpen, setIsOpen] = useState(false);
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

  return (
    <div>
      <header>
        <h1>Insert Logo Here.</h1>
        <h2>Dashboard</h2>
        <nav>
          <a type="button" href={`http://localhost:5173/users/${user_uuid}/applications`}>Your Applications</a>
          <button type="button" onClick={handleOpenModal}>Add Application</button>
          <button type="button" onClick={handleLogOut}>Sign Out.</button>
        </nav>
      </header>
      <main>
        <JobBoard />
        <div>
          <h2>Responses</h2>
        </div>
        <ApplicationForm isOpen={isOpen} handleCloseClick={handleCloseClick} user_uuid={user_uuid} />
      </main>
    </div>
  );
};

export default Dashboard;
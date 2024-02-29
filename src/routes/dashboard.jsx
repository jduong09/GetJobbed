import { useEffect } from 'react';
import { JobBoard } from '../jobBoard/jobBoard';

const Dashboard = () => {
  useEffect(() => {
    const fetchFilteredEmails = async () => {
      const response = await fetch(`http://localhost:5000${window.location.pathname}/messages`);
      const data = response.json();
      console.log(data);
    }
    fetchFilteredEmails();
  }, []);

  return (
    <div>
      <header>
        <h1>Insert Logo Here.</h1>
        <h2>Dashboard</h2>
        <nav>
          <button>Sign Out.</button>
        </nav>
      </header>
      <main>
        <JobBoard />
        <div>
          <h2>Responses</h2>
        </div>
      </main>
    </div>
  )
};

export default Dashboard;
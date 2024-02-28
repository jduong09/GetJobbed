import { useEffect } from 'react';

const Dashboard = () => {
  useEffect(() => {
    const fetchFilteredEmails = async () => {
      const response = await fetch(`http://localhost:5000${window.location.pathname}/messages`);
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
        <div>
          <h2>Job Board</h2>
        </div>
        <div>
          <h2>Responses</h2>
        </div>
      </main>
    </div>
  )
};

export default Dashboard;
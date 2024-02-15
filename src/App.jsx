import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg';
import './css/App.css';
import { JobBoard } from './jobBoard/jobBoard';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    const authenticateUser = async () => {
      try {
        await fetch('http://localhost:5000/gmail/auth');
      } catch(err) {
        console.log(err);
      }
    }

    authenticateUser();
  }, []);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <JobBoard />
    </>
  )
}

export default App

import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg';
import '../css/App.css';
import { JobBoard } from '../jobBoard/jobBoard';
import LandingPage from './landingPage';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    const authorizeUser = async () => {
      try {
        const response = await fetch('http://localhost:5000/auth/authorize');
        const { signedIn, oauthUrl } = await response.json();
        if (!signedIn) {
          window.location = oauthUrl;
        }
      } catch(err) {
        console.log(err);
      }
    }

    authorizeUser();
  }, []);

  const handleProfileClick = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/gmail/user/messages');
      const data = await response.json();
      console.log(data);
    } catch(err) {
      console.log(err);
    }
  }

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
      <LandingPage />
      <button type='button' id='btn-profile' onClick={handleProfileClick}>Get Messages</button>
    </>
  )
}

export default App
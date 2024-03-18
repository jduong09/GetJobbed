import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LandingPage from './routes/landingPage.jsx';
import Login from './routes/loginPage.jsx';
import ApplicationsPage from './routes/applicationsPage.jsx';
import Dashboard from './routes/dashboard.jsx';
import './css/meyers_reset.css';
import './css/index.css';
import './css/App.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/users/:user_uuid/applications",
    element: <ApplicationsPage />
  },
  {
    path: "/users/:user_uuid",
    element: <Dashboard />
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)

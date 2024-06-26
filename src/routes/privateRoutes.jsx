import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoutes = () => {
  let auth = document.cookie.match('connect.sid');
  return auth ? <Outlet/> : <Navigate to='/login'/>
}

export default PrivateRoutes;
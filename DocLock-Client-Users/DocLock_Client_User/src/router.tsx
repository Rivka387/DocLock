import { createBrowserRouter } from 'react-router';
import Login from './components/User pages/Login';
import Register from './components/User pages/Register';
import UploadFile from './components/File Pages/UploadFile';
import FileList from './components/File Pages/FileList';
import AppLayout from './components/AppLayout';
import ViewFile from './components/File Pages/ViewFile';
import { JSX, useEffect } from 'react';
import { useNavigate } from 'react-router';
import userStore from './components/User pages/userStore';
import Dashboard from './components/User pages/Dashboard';
import About from './components/About';


const TOKEN_EXPIRATION_TIME = 1000* 60 * 60 * 2; 

const isAuthenticated = (): boolean => {
  const token = userStore.token;
  const loginTime = sessionStorage.getItem("loginTime");
console.log('isAuthenticated', token, loginTime);

  if (!token || !loginTime) return false;

  const elapsedTime = Date.now() - parseInt(loginTime, 10);
  if (elapsedTime > TOKEN_EXPIRATION_TIME) {
    userStore.logout();
    console.log('Token expired');
    
    return false;
  }

  return true;
};


const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login');
    }
  }, [navigate]);

  return children;
};

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      {path:'',element: <ProtectedRoute><Dashboard/></ProtectedRoute>},
      {path:'about',element: <ProtectedRoute><About/></ProtectedRoute>},
      { path: 'upload', element: <ProtectedRoute><UploadFile /></ProtectedRoute>},
      { path: 'filelist', element: <ProtectedRoute><FileList /></ProtectedRoute> },
      { path: 'view-file', element: <ProtectedRoute><ViewFile /></ProtectedRoute> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> }
    ],
  },
]);
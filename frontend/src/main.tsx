import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './pages/error.tsx';
import SignIn from './pages/sign-in.tsx';
import SignUp from './pages/sign-up.tsx';
import App from './App.tsx';
import './App.css';
import './index.css';
import UserContextProvider from './contexts/UserContext';
import ProtectedRoute from './components/ProtectedRoute.tsx';
import EditUser from './pages/edit-user.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute redirectPath='/login'>
        <App />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: '/login',
    element: <SignIn />,
  },
  {
    path: '/register',
    element: <SignUp />,
  },
  {
    path: '/profile',
    element: <EditUser />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UserContextProvider>
      <RouterProvider router={router} />
    </UserContextProvider>
  </React.StrictMode>
);

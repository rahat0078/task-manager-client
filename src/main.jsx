import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import App from './App';
import AuthProvider from './provider/AuthProvider.jsx';
import Login from './components/Login';
import Dashboard from './components/Dashboard.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "Dashboard",
        element: <Dashboard/>
      },
      {
        path: '/login',
        element: <Login/>
      }
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);


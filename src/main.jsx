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
import PrivateRoute from './private/PrivateRoute';
import Error from './components/Error.jsx';
import AddTask from './components/AddTask.jsx';
import MyTask from './components/MyTask.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: "/dashboard",
        element: <PrivateRoute><Dashboard /></PrivateRoute>,
        children: [
          {
            path: "/dashboard/addTask",
            element: <AddTask />
          },
          {
            path: "/dashboard/myTask",
            element: <MyTask />
          },
        ]
      },

      {
        path: '/login',
        element: <Login />
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


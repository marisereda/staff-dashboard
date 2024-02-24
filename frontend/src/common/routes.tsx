import { Navigate, createBrowserRouter } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <div>Employees Page</div>,
      },
      {
        path: 'employees',
        element: <Navigate to="/" />,
      },
      {
        path: 'stores',
        element: <div>Stores Page</div>,
      },
      {
        path: 'employers',
        element: <div>Employers Page</div>,
      },
    ],
  },
]);

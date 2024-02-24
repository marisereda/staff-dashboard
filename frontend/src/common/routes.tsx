import { Navigate, createBrowserRouter } from 'react-router-dom';
import { EmployeesPage } from '../employees/pages/EmployeesPage';
import { MainLayout } from './layouts/MainLayout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <EmployeesPage />,
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

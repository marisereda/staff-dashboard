import { Navigate, createBrowserRouter } from 'react-router-dom';
import { EmployeesPage } from '../employees/pages/EmployeesPage';
import { EmployersPage } from '../employers/pages/EmployersPage';
import { StoresPage } from '../stores/pages/StoresPage';
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
        element: <StoresPage />,
      },
      {
        path: 'employers',
        element: <EmployersPage />,
      },
    ],
  },
]);

import { createBrowserRouter, Navigate } from 'react-router-dom';
import { PublicLayout } from '../components/layout/PublicLayout';
import { AdminLayout } from '../components/layout/AdminLayout';
import { HomePage } from '../pages/HomePage';
import { RainPage } from '../pages/RainPage';
import { WriteMessagePage } from '../pages/WriteMessagePage';
import { TeacherSelectPage } from '../pages/TeacherSelectPage';
import { TeacherLettersPage } from '../pages/TeacherLettersPage';
import { AdminLoginPage } from '../pages/admin/AdminLoginPage';
import { AdminDashboardPage } from '../pages/admin/AdminDashboardPage';
import { AdminTeachersPage } from '../pages/admin/AdminTeachersPage';
import { AdminHomeLetterPage } from '../pages/admin/AdminHomeLetterPage';
import { AdminMessagesPage } from '../pages/admin/AdminMessagesPage';
import { AdminQrPage } from '../pages/admin/AdminQrPage';
import { isAdminLoggedIn } from '../services/adminService';

// Admin route guard
function RequireAdmin({ children }: { children: React.ReactNode }) {
  if (!isAdminLoggedIn()) {
    return <Navigate to="/admin/login" replace />;
  }
  return <>{children}</>;
}

export const router = createBrowserRouter([
  // Public routes (home + rain + write)
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'rain', element: <RainPage /> },
      { path: 'write', element: <WriteMessagePage /> },
    ],
  },

  // Teacher routes (separate — no PublicLayout)
  { path: '/teacher', element: <TeacherSelectPage /> },
  { path: '/teacher/:teacherSlug', element: <TeacherLettersPage /> },

  // Admin routes
  {
    path: '/admin',
    children: [
      { path: 'login', element: <AdminLoginPage /> },
      {
        path: '',
        element: (
          <RequireAdmin>
            <AdminLayout />
          </RequireAdmin>
        ),
        children: [
          { path: 'dashboard', element: <AdminDashboardPage /> },
          { path: 'teachers', element: <AdminTeachersPage /> },
          { path: 'home-letter', element: <AdminHomeLetterPage /> },
          { path: 'messages', element: <AdminMessagesPage /> },
          { path: 'qr', element: <AdminQrPage /> },
          { index: true, element: <Navigate to="dashboard" replace /> },
        ],
      },
    ],
  },
]);

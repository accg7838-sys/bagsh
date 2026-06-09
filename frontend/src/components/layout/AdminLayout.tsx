import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { adminLogout } from '../../services/adminService';
import { AdminSidebar } from '../admin/AdminSidebar';

export function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    adminLogout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar currentPath={location.pathname} onLogout={handleLogout} />

      <div className="flex-1 lg:ml-64">
        <header className="sticky top-0 z-30 bg-white border-b border-gray-200 px-6 h-14 flex items-center justify-between">
          <h1 className="text-lg font-semibold text-slate">Админ Панел</h1>
          <button
            onClick={handleLogout}
            className="text-sm text-slate/60 hover:text-red-500 transition-colors cursor-pointer"
          >
            Гарах
          </button>
        </header>

        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

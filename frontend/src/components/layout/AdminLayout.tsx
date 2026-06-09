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
    <div className="min-h-screen bg-warm-gradient lg:flex">
      <AdminSidebar currentPath={location.pathname} onLogout={handleLogout} />

      <div className="flex-1 pt-14 lg:ml-72 lg:pt-0">
        <header className="sticky top-0 z-30 hidden h-16 items-center justify-between border-b border-white/70 bg-white/70 px-6 shadow-sm backdrop-blur-xl lg:flex">
          <div>
            <h1 className="text-lg font-black tracking-[-0.03em] text-warm">Админ панел</h1>
            <p className="text-xs text-slate/45">Багш нарын талархлын систем</p>
          </div>
          <button
            onClick={handleLogout}
            className="rounded-2xl px-4 py-2 text-sm font-semibold text-slate/60 transition hover:bg-red-50 hover:text-red-500 cursor-pointer"
          >
            Гарах
          </button>
        </header>

        <main className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

import { Link } from 'react-router-dom';
import { cn } from '../../utils/cn';

interface AdminSidebarProps {
  currentPath: string;
  onLogout: () => void;
}

const links = [
  { to: '/admin/dashboard', label: '📊 Хяналтын самбар', icon: '📊' },
  { to: '/admin/teachers', label: '👩‍🏫 Багш нар', icon: '👩‍🏫' },
  { to: '/admin/home-letter', label: '✉️ Нүүр захидал', icon: '✉️' },
  { to: '/admin/messages', label: '💬 Санваартнууд', icon: '💬' },
  { to: '/admin/qr', label: '📱 QR Код', icon: '📱' },
];

export function AdminSidebar({ currentPath, onLogout }: AdminSidebarProps) {
  return (
    <>
      {/* Mobile header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-white border-b border-gray-200 px-4 h-14 flex items-center gap-3 overflow-x-auto">
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={cn(
              'whitespace-nowrap px-3 py-1.5 rounded-lg text-sm no-underline transition-colors',
              currentPath === link.to
                ? 'bg-primary/10 text-primary-dark font-medium'
                : 'text-slate/70 hover:bg-gray-100'
            )}
          >
            {link.icon}
          </Link>
        ))}
        <button
          onClick={onLogout}
          className="ml-auto text-sm text-slate/50 hover:text-red-500 cursor-pointer"
        >
          Гарах
        </button>
      </div>

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex fixed left-0 top-0 bottom-0 w-64 bg-white border-r border-gray-200 flex-col">
        <div className="p-6 border-b border-gray-100">
          <h1 className="text-xl font-bold text-primary">🌸 Админ</h1>
          <p className="text-sm text-slate/50 mt-1">Багшдаа Баярлалаа</p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-xl text-sm no-underline transition-all duration-200',
                currentPath === link.to
                  ? 'bg-primary/10 text-primary-dark font-medium shadow-sm'
                  : 'text-slate hover:bg-gray-100'
              )}
            >
              <span className="text-lg">{link.icon}</span>
              <span className="hidden sm:inline">{link.label.replace(/^[^\s]+\s/, '')}</span>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <button
            onClick={onLogout}
            className="w-full px-4 py-2 text-sm text-slate/60 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
          >
            🚪 Гарах
          </button>
        </div>
      </aside>
    </>
  );
}

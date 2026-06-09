import { Link } from 'react-router-dom';
import { cn } from '../../utils/cn';

interface AdminSidebarProps {
  currentPath: string;
  onLogout: () => void;
}

const links = [
  { to: '/admin/dashboard', label: 'Хяналтын самбар', icon: '📊' },
  { to: '/admin/teachers', label: 'Багш нар', icon: '🧑‍🏫' },
  { to: '/admin/home-letter', label: 'Нүүр захидал', icon: '✉️' },
  { to: '/admin/messages', label: 'Сэтгэгдлүүд', icon: '💬' },
  { to: '/admin/qr', label: 'QR код', icon: '📱' },
];

export function AdminSidebar({ currentPath, onLogout }: AdminSidebarProps) {
  return (
    <>
      <div className="fixed left-0 right-0 top-0 z-40 flex h-14 items-center gap-2 overflow-x-auto border-b border-white/70 bg-white/80 px-3 shadow-sm backdrop-blur-xl lg:hidden">
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={cn(
              'whitespace-nowrap rounded-2xl px-3 py-2 text-sm no-underline transition-colors',
              currentPath === link.to
                ? 'bg-primary/10 text-primary-dark font-bold'
                : 'text-slate/65 hover:bg-white'
            )}
            title={link.label}
          >
            {link.icon}
          </Link>
        ))}
        <button
          onClick={onLogout}
          className="ml-auto rounded-2xl px-3 py-2 text-sm font-semibold text-slate/50 hover:bg-red-50 hover:text-red-500 cursor-pointer"
        >
          Гарах
        </button>
      </div>

      <aside className="fixed bottom-0 left-0 top-0 hidden w-72 flex-col border-r border-white/70 bg-white/75 shadow-[16px_0_60px_rgba(159,45,87,0.08)] backdrop-blur-xl lg:flex">
        <div className="border-b border-primary/10 p-6">
          <div className="flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-primary to-primary-dark text-xl text-white shadow-lg shadow-primary/25">♥</span>
            <div>
              <h1 className="text-xl font-black tracking-[-0.04em] text-warm">Админ</h1>
              <p className="text-sm text-slate/45">Багшдаа баярлалаа</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 space-y-2 p-4">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={cn(
                'flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold no-underline transition-all duration-200',
                currentPath === link.to
                  ? 'bg-primary/10 text-primary-dark shadow-sm ring-1 ring-primary/10'
                  : 'text-slate/70 hover:bg-white/80 hover:text-warm'
              )}
            >
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-white/70 shadow-sm">{link.icon}</span>
              <span>{link.label}</span>
            </Link>
          ))}
        </nav>

        <div className="border-t border-primary/10 p-4">
          <button
            onClick={onLogout}
            className="w-full rounded-2xl px-4 py-3 text-sm font-semibold text-slate/60 transition-colors hover:bg-red-50 hover:text-red-500 cursor-pointer"
          >
            🚪 Гарах
          </button>
        </div>
      </aside>
    </>
  );
}

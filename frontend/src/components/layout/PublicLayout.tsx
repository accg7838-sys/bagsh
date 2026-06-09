import { Outlet, Link, useLocation } from 'react-router-dom';

export function PublicLayout() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-warm-gradient">
      <nav className="sticky top-0 z-40 bg-white/70 backdrop-blur-md border-b border-rose-100">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 no-underline">
            <span className="text-2xl">🌸</span>
            <span className="font-bold text-lg text-rose-500 hidden sm:inline">
              Багшдаа Баярлалаа
            </span>
          </Link>

          <div className="flex items-center gap-2">
            {location.pathname !== '/' && (
              <Link
                to="/"
                className="px-3 py-1.5 text-sm rounded-lg text-slate hover:bg-rose-50 transition-colors no-underline"
              >
                Нүүр
              </Link>
            )}
            <Link
              to="/write"
              className="px-4 py-1.5 text-sm rounded-xl bg-rose-500 text-white hover:bg-rose-600 transition-colors no-underline font-medium"
            >
              Сэтгэгдэл үлдээх
            </Link>
          </div>
        </div>
      </nav>

      <main>
        <Outlet />
      </main>

      <footer className="py-6 text-center text-sm text-slate/50">
        <p>🌸 Багш нартаа баярлалаа</p>
      </footer>
    </div>
  );
}

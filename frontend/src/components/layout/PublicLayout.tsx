import { Outlet } from 'react-router-dom';

export function PublicLayout() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-warm-gradient">
      <div className="decorative-grid fixed inset-0 pointer-events-none" />
      <div className="floating-orb fixed -left-16 top-24 h-56 w-56 bg-primary-light/35" />
      <div className="floating-orb fixed -right-20 top-16 h-64 w-64 bg-accent/15" style={{ animationDelay: '1.4s' }} />
      <div className="floating-orb fixed bottom-8 left-1/2 h-52 w-52 bg-primary/10" style={{ animationDelay: '2.2s' }} />
      <main className="relative z-10">
        <Outlet />
      </main>
    </div>
  );
}

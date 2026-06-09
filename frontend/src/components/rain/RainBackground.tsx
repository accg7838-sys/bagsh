export function RainBackground() {
  return (
    <div className="fixed inset-0 -z-10 bg-rain-gradient">
      <div className="decorative-grid absolute inset-0" />
      <div className="floating-orb left-8 top-24 h-36 w-36 bg-primary-light/30" />
      <div className="floating-orb right-10 top-28 h-44 w-44 bg-accent/10" style={{ animationDelay: '1s' }} />
      <div className="floating-orb bottom-16 left-1/4 h-40 w-40 bg-primary/10" style={{ animationDelay: '2s' }} />
      <div className="absolute left-8 top-32 text-5xl opacity-20">🌸</div>
      <div className="absolute right-16 top-36 text-4xl opacity-20">✨</div>
      <div className="absolute bottom-24 left-14 text-4xl opacity-20">💗</div>
      <div className="absolute bottom-14 right-10 text-5xl opacity-20">🌷</div>
    </div>
  );
}

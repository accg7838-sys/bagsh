export function RainBackground() {
  return (
    <div className="fixed inset-0 -z-10 bg-rain-gradient">
      {/* Subtle decorative floating elements */}
      <div
        className="absolute top-10 left-10 text-4xl opacity-20 animate-bounce"
        style={{ animationDuration: '3s' }}
      >
        🌸
      </div>
      <div
        className="absolute top-20 right-16 text-3xl opacity-15 animate-bounce"
        style={{ animationDuration: '4s', animationDelay: '1s' }}
      >
        ✨
      </div>
      <div
        className="absolute bottom-20 left-20 text-3xl opacity-15 animate-bounce"
        style={{ animationDuration: '3.5s', animationDelay: '2s' }}
      >
        💖
      </div>
      <div
        className="absolute bottom-10 right-10 text-4xl opacity-20 animate-bounce"
        style={{ animationDuration: '4.5s', animationDelay: '0.5s' }}
      >
        🌺
      </div>
    </div>
  );
}

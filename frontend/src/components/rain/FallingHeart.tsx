interface FallingHeartProps {
  studentName: string;
  content: string;
  x: number;
  delay: number;
  duration: number;
  index: number;
}

export function FallingHeart({ studentName, content, x, delay, duration, index }: FallingHeartProps) {
  const rotate = (index % 5) - 2;

  return (
    <div
      className="heart-shape absolute"
      style={{
        left: `${x}%`,
        animation: `fall ${duration}s linear ${delay}s infinite`,
        rotate: `${rotate}deg`,
      }}
    >
      <div className="relative z-10">
        <p className="mb-1 max-w-[160px] truncate text-xs font-black uppercase tracking-[0.12em] text-primary-dark/70">
          {studentName}
        </p>
        <p className="line-clamp-3 text-sm font-medium leading-snug text-slate/80">
          {content}
        </p>
      </div>
    </div>
  );
}

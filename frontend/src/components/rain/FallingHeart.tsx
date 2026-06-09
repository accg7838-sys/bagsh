interface FallingHeartProps {
  studentName: string;
  content: string;
  x: number;
  delay: number;
  duration: number;
  index: number;
}

export function FallingHeart({ studentName, content, x, delay, duration, index }: FallingHeartProps) {
  const hue = (index * 47 + 340) % 40; // Pink/rose range
  const saturation = 70 + (index % 3) * 10;

  return (
    <div
      className="heart-shape absolute"
      style={{
        left: `${x}%`,
        animation: `fall ${duration}s linear ${delay}s infinite`,
        backgroundColor: `hsl(${hue + 340}, ${saturation}%, 98%)`,
        borderColor: `hsl(${hue + 340}, ${saturation}%, 85%)`,
        borderWidth: 1,
        borderStyle: 'solid',
      }}
    >
      <p className="text-xs font-bold text-rose-400 mb-1 truncate">{studentName}</p>
      <p className="text-sm text-slate leading-snug line-clamp-3">{content}</p>
    </div>
  );
}

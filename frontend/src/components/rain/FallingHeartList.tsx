import { useMemo } from 'react';
import { FallingHeart } from './FallingHeart';
import type { RainComment } from '../../types/message';

interface FallingHeartListProps {
  comments: RainComment[];
}

const COLUMNS = 6;
const MIN_DURATION = 13;
const MAX_DURATION = 22;

function pseudoRandom(seed: number) {
  const value = Math.sin(seed * 999) * 10000;
  return value - Math.floor(value);
}

export function FallingHeartList({ comments }: FallingHeartListProps) {
  const animatedComments = useMemo(() => {
    if (comments.length === 0) return [];

    const repeatCount = comments.length < 8 ? 4 : 2;
    const multiplied = Array.from({ length: repeatCount }, () => comments).flat();

    return multiplied.map((comment, index) => {
      const column = index % COLUMNS;
      const columnWidth = 100 / COLUMNS;
      const baseX = column * columnWidth + 1.5;
      const jitter = pseudoRandom(index + comment.id) * (columnWidth - 8);
      const x = baseX + jitter;
      const delay = (index * 1.85) % 24;
      const duration = MIN_DURATION + pseudoRandom(index + 14) * (MAX_DURATION - MIN_DURATION);

      return {
        ...comment,
        x: Math.max(1.5, Math.min(82, x)),
        delay,
        duration,
        index,
      };
    });
  }, [comments]);

  if (comments.length === 0) {
    return (
      <div className="relative z-10 flex h-[70vh] items-center justify-center px-4">
        <div className="rounded-3xl bg-white/70 p-8 text-center shadow-xl ring-1 ring-primary/10 backdrop-blur">
          <p className="mb-2 text-5xl">💌</p>
          <p className="text-lg font-semibold text-primary-dark/55">Одоогоор сэтгэгдэл байхгүй байна</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative z-10 w-full overflow-hidden" style={{ height: 'calc(100vh - 88px)' }}>
      {animatedComments.map((comment, i) => (
        <FallingHeart
          key={`${comment.id}-${i}`}
          studentName={comment.studentName}
          content={comment.content}
          x={comment.x}
          delay={comment.delay}
          duration={comment.duration}
          index={comment.index}
        />
      ))}
    </div>
  );
}

import { useMemo } from 'react';
import { FallingHeart } from './FallingHeart';
import type { RainComment } from '../../types/message';

interface FallingHeartListProps {
  comments: RainComment[];
}

const COLUMNS = 6;
const MIN_DURATION = 10;
const MAX_DURATION = 18;

export function FallingHeartList({ comments }: FallingHeartListProps) {
  const animatedComments = useMemo(() => {
    if (comments.length === 0) return [];

    // Multiply comments to have enough for continuous flow
    const multiplied = comments.length < 6
      ? [...comments, ...comments, ...comments, ...comments]
      : comments;

    return multiplied.map((comment, index) => {
      const column = index % COLUMNS;
      const baseX = (column / COLUMNS) * 100;
      const x = baseX + (Math.random() * (100 / COLUMNS) - 3);
      const delay = (index * 1.5) % 20;
      const duration = MIN_DURATION + Math.random() * (MAX_DURATION - MIN_DURATION);

      return {
        ...comment,
        x: Math.max(2, Math.min(85, x)),
        delay,
        duration,
        index,
      };
    });
  }, [comments]);

  if (comments.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-xl text-primary/30">Одоогоор сэтгэгдэл байхгүй байна 🌸</p>
      </div>
    );
  }

  return (
    <div className="relative w-full overflow-hidden" style={{ height: 'calc(100vh - 56px)' }}>
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

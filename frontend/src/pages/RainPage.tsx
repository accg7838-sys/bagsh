import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FallingHeartList } from '../components/rain/FallingHeartList';
import { RainBackground } from '../components/rain/RainBackground';
import { Button } from '../components/ui/Button';
import { getRainComments } from '../services/messageService';
import type { RainComment } from '../types/message';

export function RainPage() {
  const [comments, setComments] = useState<RainComment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRainComments()
      .then(setComments)
      .catch(() => {
        setComments([
          { id: 1, studentName: 'Анужин', className: '10А', content: 'Багш нартаа маш их баярлалаа.' },
          { id: 2, studentName: 'Тэмүүлэн', className: '11Б', content: 'Та бүхний ачаар бид илүү ихийг сурч байна.' },
          { id: 3, studentName: 'Мөнхжин', className: '9В', content: 'Биднийг үргэлж дэмждэгт баярлалаа.' },
          { id: 4, studentName: 'Нарантуяа', className: '10А', content: 'Багш таны хичээл зүтгэлд баярлалаа.' },
          { id: 5, studentName: 'Билгүүн', className: '12А', content: 'Таны ачаар би математикт дуртай болсон.' },
        ]);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="relative min-h-screen">
      <RainBackground />

      {/* Top bar */}
      <div className="relative z-10 flex items-center justify-between px-4 py-3">
        <div className="flex gap-2">
          <Link to="/">
            <Button variant="ghost" size="sm">
              ← Буцах
            </Button>
          </Link>
        </div>
        <Link to="/write">
          <Button size="sm">✏️ Бичих</Button>
        </Link>
      </div>

      {/* Falling hearts */}
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="text-xl text-primary/50 animate-pulse">Ачаалж байна...</div>
        </div>
      ) : (
        <FallingHeartList comments={comments} />
      )}
    </div>
  );
}

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
          { id: 1, studentName: 'Анужин', className: '10А', content: 'Багш нартаа маш их баярлалаа. Та бүхний урам бидэнд хүч өгдөг.' },
          { id: 2, studentName: 'Тэмүүлэн', className: '11Б', content: 'Та бүхний ачаар бид илүү ихийг сурч, өөртөө итгэлтэй болж байна.' },
          { id: 3, studentName: 'Мөнхжин', className: '9В', content: 'Биднийг үргэлж ойлгож, дэмждэгт баярлалаа.' },
          { id: 4, studentName: 'Нарантуяа', className: '10А', content: 'Багш таны хичээл зүтгэл, тэвчээрт чин сэтгэлээсээ баярлалаа.' },
          { id: 5, studentName: 'Билгүүн', className: '12А', content: 'Таны ачаар би сурах хүсэлтэй болсон. Баярлалаа багшаа.' },
          { id: 6, studentName: 'Энхжин', className: '8Б', content: 'Хичээлийг ойлгомжтой зааж, үргэлж инээмсэглэдэгт баярлалаа.' },
        ]);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <RainBackground />

      <div className="relative z-20 px-4 pt-4 sm:px-6">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 rounded-[1.5rem] bg-white/70 px-3 py-3 shadow-lg shadow-primary/10 ring-1 ring-white/70 backdrop-blur-xl sm:px-4">
          <div className="flex items-center gap-3">
            <Link to="/">
              <Button variant="ghost" size="sm">
                ← Буцах
              </Button>
            </Link>
            <div className="hidden sm:block">
              <h1 className="text-lg font-black tracking-[-0.03em] text-warm">Талархлын бороо</h1>
              <p className="text-xs text-slate/50">Сэтгэгдэл зүрхэн card хэлбэрээр зөөлөн унана</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/teacher" className="hidden sm:block">
              <Button variant="outline" size="sm">🧑‍🏫 Багш</Button>
            </Link>
            <Link to="/write">
              <Button size="sm">✍️ Бичих</Button>
            </Link>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="relative z-10 flex h-[70vh] items-center justify-center">
          <div className="rounded-3xl bg-white/70 px-8 py-6 text-center shadow-xl ring-1 ring-primary/10 backdrop-blur">
            <div className="mx-auto mb-3 h-10 w-10 animate-spin rounded-full border-4 border-primary/15 border-t-primary" />
            <p className="text-lg font-semibold text-primary-dark/70">Сэтгэгдлүүдийг ачаалж байна...</p>
          </div>
        </div>
      ) : (
        <FallingHeartList comments={comments} />
      )}
    </div>
  );
}

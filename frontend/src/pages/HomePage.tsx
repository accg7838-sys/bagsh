import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { getHomeLetter } from '../services/homeLetterService';
import type { HomeLetter } from '../types/message';

export function HomePage() {
  const navigate = useNavigate();
  const [letter, setLetter] = useState<HomeLetter | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getHomeLetter()
      .then(setLetter)
      .catch(() => {
        setLetter({
          id: 0,
          title: 'Багш нартаа баярлалаа',
          content: `Эрхэм хүндэт багш нартаа,\n\nТа бүхэндээ чин сэтгэлийн талархал илэрхийлье. Биднийг мэдлэгтэй, зөв хүн болж төлөвшиходөд өдөр бүр сэтгэл гарган зааж, зөвлөж, дэмжиж байдагт баярлалаа.\n\nТаны заасан хичээл бүр, хэлсэн зөвлөгөө бүр, өгсөн урам бүр бидний ирээдүйд гэрэл нэмдэг. Бидний амжилтын ард багш таны хичээл зүтгэл үргэлж байдаг.\n\nБагш нартаа баярлалаа.`,
        });
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8">
      {/* Main content */}
      <div className="relative z-10 max-w-xl w-full text-center">
        {/* Decorative top */}
        <div className="text-5xl mb-6">💝</div>

        <h1 className="text-3xl sm:text-4xl font-bold text-warm mb-6">
          {letter?.title || 'Багш нартаа баярлалаа'}
        </h1>

        {loading ? (
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 sm:p-10 shadow-lg border border-primary/10 animate-pulse">
            <div className="h-4 bg-primary/10 rounded w-3/4 mx-auto mb-3" />
            <div className="h-4 bg-primary/10 rounded w-1/2 mx-auto mb-3" />
            <div className="h-4 bg-primary/10 rounded w-2/3 mx-auto" />
          </div>
        ) : (
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 sm:p-10 shadow-lg border border-primary/10 mb-8">
            {letter?.content.split('\n').map((paragraph, i) => (
              paragraph.trim() ? (
                <p key={i} className="text-base sm:text-lg text-slate leading-relaxed mb-4 last:mb-0">
                  {paragraph}
                </p>
              ) : (
                <br key={i} />
              )
            ))}
          </div>
        )}

        {/* Single main button */}
        <Button
          size="lg"
          onClick={() => navigate('/rain')}
          className="w-full sm:w-auto text-lg px-12 py-4 rounded-2xl"
        >
          💖 Хүүхдүүдийн сэтгэгдлийг харах
        </Button>

        {/* Subtle secondary links */}
        <div className="mt-8 flex items-center justify-center gap-6 text-sm">
          <button
            onClick={() => navigate('/write')}
            className="text-warm/60 hover:text-primary transition-colors cursor-pointer underline underline-offset-2"
          >
            ✏️ Сэтгэгдэл үлдээх
          </button>
          <span className="text-warm/20">|</span>
          <button
            onClick={() => navigate('/teacher')}
            className="text-warm/60 hover:text-primary transition-colors cursor-pointer underline underline-offset-2"
          >
            👩‍🏫 Багш нар
          </button>
        </div>
      </div>
    </div>
  );
}

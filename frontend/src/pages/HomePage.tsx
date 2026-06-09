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
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
      <div className="relative z-10 max-w-xl w-full text-center">
        <div className="text-6xl mb-8">💝</div>

        <h1 className="text-3xl sm:text-4xl font-bold text-warm mb-8">
          {letter?.title || 'Багш нартаа баярлалаа'}
        </h1>

        {loading ? (
          <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-md border border-primary/10 animate-pulse">
            <div className="h-4 bg-primary/10 rounded w-3/4 mx-auto mb-4" />
            <div className="h-4 bg-primary/10 rounded w-1/2 mx-auto mb-4" />
            <div className="h-4 bg-primary/10 rounded w-2/3 mx-auto" />
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-md border border-primary/10 mb-10 text-left">
            {letter?.content.split('\n').map((paragraph, i) => (
              paragraph.trim() ? (
                <p key={i} className="text-base sm:text-lg text-slate leading-loose mb-5 last:mb-0">
                  {paragraph}
                </p>
              ) : null
            ))}
          </div>
        )}

        <Button
          size="lg"
          onClick={() => navigate('/rain')}
          className="text-lg px-14 py-5 rounded-2xl shadow-lg"
        >
          💖 Хүүхдүүдийн сэтгэгдлийг харах
        </Button>
      </div>
    </div>
  );
}

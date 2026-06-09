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
        // Use fallback content if API fails
        setLetter({
          id: 0,
          title: 'Багш нартаа баярлалаа',
          content: `Эрхэм хүндэт багш нартаа,\n\nТа бүхэндээ чин сэтгэлийн талархал илэрхийлье. Биднийг мэдлэгтэй, зөв хүн болж төлөвшиходөд өдөр бүр сэтгэл гарган зааж, зөвлөж, дэмжиж байдагт баярлалаа.\n\nТаны заасан хичээл бүр, хэлсэн зөвлөгөө бүр, өгсөн урам бүр бидний ирээдүйд гэрэл нэмдэг. Бидний амжилтын ард багш таны хичээл зүтгэл үргэлж байдаг.\n\nБагш нартаа баярлалаа.`,
        });
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-[calc(100vh-56px)] flex flex-col items-center justify-center px-4 py-12">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 text-5xl opacity-20 animate-bounce" style={{ animationDuration: '3s' }}>🌸</div>
      <div className="absolute top-40 right-16 text-4xl opacity-15 animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }}>✨</div>
      <div className="absolute bottom-40 left-16 text-4xl opacity-15 animate-bounce" style={{ animationDuration: '3.5s', animationDelay: '2s' }}>💖</div>
      <div className="absolute bottom-20 right-10 text-5xl opacity-20 animate-bounce" style={{ animationDuration: '4.5s', animationDelay: '0.5s' }}>🌺</div>

      {/* Main content */}
      <div className="relative z-10 max-w-2xl w-full text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-rose-400 to-gold-400 mb-8">
          {letter?.title || 'Багш нартаа баярлалаа'}
        </h1>

        {loading ? (
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 sm:p-12 shadow-xl border border-rose-100 animate-pulse">
            <div className="h-4 bg-rose-100 rounded w-3/4 mx-auto mb-3" />
            <div className="h-4 bg-rose-100 rounded w-1/2 mx-auto mb-3" />
            <div className="h-4 bg-rose-100 rounded w-2/3 mx-auto" />
          </div>
        ) : (
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 sm:p-12 shadow-xl border border-rose-100 mb-10">
            <div className="text-5xl mb-6">💝</div>
            {letter?.content.split('\n').map((paragraph, i) => (
              paragraph.trim() ? (
                <p key={i} className="text-lg sm:text-xl text-slate leading-relaxed mb-4 last:mb-0">
                  {paragraph}
                </p>
              ) : (
                <br key={i} />
              )
            ))}
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            size="lg"
            onClick={() => navigate('/rain')}
            className="w-full sm:w-auto text-lg px-10"
          >
            💖 Хүүхдүүдийн сэтгэгдлийг харах
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => navigate('/write')}
            className="w-full sm:w-auto text-lg px-10"
          >
            ✏️ Сэтгэгдэл үлдээх
          </Button>
        </div>

        <div className="mt-6">
          <button
            onClick={() => navigate('/teacher')}
            className="text-rose-400 hover:text-rose-500 text-sm underline transition-colors cursor-pointer"
          >
            👩‍🏫 Багш нар нэвтрэх
          </button>
        </div>
      </div>
    </div>
  );
}

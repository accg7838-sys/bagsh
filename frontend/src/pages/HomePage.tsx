import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
          content: `Эрхэм хүндэт багш нартаа,\n\nТа бүхэндээ чин сэтгэлийн талархал илэрхийлье. Биднийг мэдлэгтэй, зөв хүн болж төлөвшихөд өдөр бүр сэтгэл гарган зааж, зөвлөж, дэмжиж байдагт баярлалаа.\n\nТаны заасан хичээл бүр, хэлсэн зөвлөгөө бүр, өгсөн урам бүр бидний ирээдүйд гэрэл нэмдэг. Бидний амжилтын ард багш таны хичээл зүтгэл үргэлж байдаг.\n\nБагш нартаа баярлалаа.`,
        });
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen px-5 py-6 sm:px-8 sm:py-8">
      <header className="mx-auto flex max-w-6xl items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-3 no-underline">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white/80 text-xl shadow-sm ring-1 ring-primary/10">
            💗
          </span>
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-primary-dark/70">Thank You</p>
            <p className="text-sm text-slate/55">Багш нарт зориулсан булан</p>
          </div>
        </Link>
        <Link to="/teacher" className="hidden rounded-full bg-white/70 px-4 py-2 text-sm font-semibold text-primary-dark shadow-sm ring-1 ring-primary/10 no-underline transition hover:bg-white sm:inline-flex">
          🧑‍🏫 Багшийн хуудас
        </Link>
      </header>

      <section className="mx-auto grid max-w-6xl items-center gap-10 py-12 lg:grid-cols-[1fr_0.95fr] lg:py-16">
        <div className="text-center lg:text-left">
          <div className="soft-pill px-4 py-2 text-sm font-semibold">
            <span>🌸</span>
            <span>Сурагчдын чин сэтгэлийн талархал</span>
          </div>

          <h1 className="mt-7 text-4xl font-black leading-tight tracking-[-0.05em] text-warm sm:text-6xl lg:text-7xl">
            {letter?.title || 'Багш нартаа баярлалаа'}
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate/70 sm:text-lg lg:mx-0">
            Багш бүрт хүйсээс үл хамааран дулаан, хүндэтгэлтэй мэдрэмж төрүүлэхээр зөөлөн ягаан өнгө, цэвэрхэн card, талархлын бороотой UI болголоо.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
            <Button
              size="lg"
              onClick={() => navigate('/rain')}
              className="w-full sm:w-auto"
            >
              💌 Сэтгэгдлийн бороо харах
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate('/write')}
              className="w-full sm:w-auto"
            >
              ✍️ Талархал бичих
            </Button>
          </div>

          <div className="mt-7 grid grid-cols-3 gap-3 text-center sm:max-w-lg lg:text-left">
            {[
              ['💗', 'Хүндэтгэлтэй'],
              ['🌧️', 'Smooth бороо'],
              ['🧑‍🏫', 'Бүх багшид'],
            ].map(([icon, label]) => (
              <div key={label} className="rounded-3xl bg-white/58 px-3 py-4 shadow-sm ring-1 ring-primary/10 backdrop-blur">
                <p className="text-2xl">{icon}</p>
                <p className="mt-1 text-xs font-semibold text-slate/65 sm:text-sm">{label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute -left-6 -top-6 h-24 w-24 rounded-full bg-primary-light/35 blur-2xl" />
          <div className="absolute -bottom-8 -right-8 h-32 w-32 rounded-full bg-accent/20 blur-2xl" />

          <div className="glass-card animate-glow-pulse relative rounded-[2rem] p-5 sm:p-7">
            <div className="mb-5 flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-primary-dark/70">Нүүр захидал</p>
                <p className="text-xs text-slate/45">Багш нарт зориулав</p>
              </div>
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-primary to-primary-dark text-xl text-white shadow-lg shadow-primary/25">
                ♥
              </span>
            </div>

            {loading ? (
              <div className="space-y-4 rounded-[1.5rem] bg-white/70 p-7">
                <div className="mx-auto h-4 w-3/4 animate-pulse rounded-full bg-primary/10" />
                <div className="mx-auto h-4 w-11/10 animate-pulse rounded-full bg-primary/10" />
                <div className="mx-auto h-4 w-2/3 animate-pulse rounded-full bg-primary/10" />
              </div>
            ) : (
              <article className="rounded-[1.5rem] bg-white/80 p-6 shadow-inner ring-1 ring-white/70 sm:p-8">
                <div className="mb-5 text-center text-4xl">💝</div>
                {letter?.content.split('\n').map((paragraph, i) => (
                  paragraph.trim() ? (
                    <p key={i} className="mb-4 text-[15px] leading-8 text-slate/80 last:mb-0 sm:text-base">
                      {paragraph}
                    </p>
                  ) : null
                ))}
              </article>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

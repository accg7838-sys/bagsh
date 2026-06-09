import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { TeacherCard } from '../components/teacher/TeacherCard';
import { getTeachers } from '../services/teacherService';
import type { Teacher } from '../types/teacher';

export function TeacherSelectPage() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTeachers()
      .then(setTeachers)
      .catch(() => {
        setTeachers([
          { id: 1, name: 'Батболд багш', subject: 'Математик', slug: 'batbold-bagsh' },
          { id: 2, name: 'Сарантуяа багш', subject: 'Монгол хэл', slug: 'sarantuya-bagsh' },
          { id: 3, name: 'Оюун багш', subject: 'Англи хэл', slug: 'oyun-bagsh' },
          { id: 4, name: 'Эрдэнэ багш', subject: 'Физик', slug: 'erdene-bagsh' },
        ]);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-warm-gradient px-4 py-6 sm:px-6 sm:py-8">
      <div className="decorative-grid fixed inset-0 pointer-events-none" />
      <div className="relative z-10 mx-auto max-w-5xl">
        <div className="mb-8 flex items-center justify-between gap-3">
          <Link to="/">
            <Button variant="ghost" size="sm">← Нүүр</Button>
          </Link>
          <Link to="/write">
            <Button size="sm">✍️ Захидал бичих</Button>
          </Link>
        </div>

        <section className="mb-10 rounded-[2rem] bg-white/70 p-7 text-center shadow-xl shadow-primary/10 ring-1 ring-white/70 backdrop-blur-xl sm:p-10">
          <div className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-3xl bg-gradient-to-br from-primary to-primary-dark text-2xl text-white shadow-lg shadow-primary/25">
            🧑‍🏫
          </div>
          <h1 className="text-3xl font-black tracking-[-0.04em] text-warm sm:text-5xl">Багшаа сонгоно уу</h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate/60 sm:text-base">
            Багш бүрийн хувийн захидлын булан. Нэр дээрээ дараад хүүхдүүдийн бичсэн талархлыг дулаахан card хэлбэрээр уншаарай.
          </p>
        </section>

        {loading ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-52 animate-pulse rounded-[1.75rem] bg-white/60 ring-1 ring-primary/10" />
            ))}
          </div>
        ) : teachers.length === 0 ? (
          <div className="rounded-[2rem] bg-white/70 p-12 text-center shadow-lg ring-1 ring-primary/10 backdrop-blur">
            <p className="mb-3 text-5xl">💌</p>
            <p className="font-semibold text-slate/55">Одоогоор багш бүртгэгдээгүй байна</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {teachers.map((teacher) => (
              <TeacherCard key={teacher.id} teacher={teacher} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

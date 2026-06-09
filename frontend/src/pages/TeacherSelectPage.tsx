import { useState, useEffect } from 'react';
import { TeacherCard } from '../components/teacher/TeacherCard';
import { Input } from '../components/ui/Input';
import { getTeachers } from '../services/teacherService';
import type { Teacher } from '../types/teacher';

export function TeacherSelectPage() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTeachers()
      .then(setTeachers)
      .catch(() => {
        setTeachers([
          { id: 1, name: 'Батболд багш', subject: 'Математик', slug: 'batbold-bagsh' },
          { id: 2, name: 'Сарантуяа багш', subject: 'Монгол хэл', slug: 'sarantuya-bagsh' },
          { id: 3, name: 'Оюун багш', subject: 'Англи хэл', slug: 'oyun-bagsh' },
        ]);
      })
      .finally(() => setLoading(false));
  }, []);

  const filtered = teachers.filter((t) =>
    t.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-[calc(100vh-56px)] px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-rose-500 mb-2">👩‍🏫 Багшаа сонгоно уу</h2>
          <p className="text-slate/60">Өөртөө ирсэн захидлуудыг харахын тулд нэр дээрээ дарна уу</p>
        </div>

        <div className="mb-8">
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="🔍 Багшийн нэрээр хайх..."
          />
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="text-2xl text-rose-300 animate-pulse">Ачаалж байна...</div>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-12 text-slate/50">
            <p className="text-4xl mb-3">🔍</p>
            <p>Багш олдсонгүй</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {filtered.map((teacher) => (
              <TeacherCard key={teacher.id} teacher={teacher} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

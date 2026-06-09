import { useState, useEffect } from 'react';
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
        ]);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-warm mb-2">👩‍🏫 Багшаа сонгоно уу</h2>
          <p className="text-slate/50">Өөртөө ирсэн захидлуудыг харахын тулд нэр дээрээ дарна уу</p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="text-2xl text-primary/30 animate-pulse">Ачаалж байна...</div>
          </div>
        ) : teachers.length === 0 ? (
          <div className="text-center py-12 text-slate/50">
            <p className="text-4xl mb-3">👩‍🏫</p>
            <p>Одоогоор багш бүртгэгдээгүй байна</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
            {teachers.map((teacher) => (
              <TeacherCard key={teacher.id} teacher={teacher} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

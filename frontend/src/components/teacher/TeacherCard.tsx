import { Link } from 'react-router-dom';
import type { Teacher } from '../../types/teacher';

interface TeacherCardProps {
  teacher: Teacher;
}

export function TeacherCard({ teacher }: TeacherCardProps) {
  return (
    <Link
      to={`/teacher/${teacher.slug}`}
      className="block no-underline bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-rose-100"
    >
      <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-rose-100 flex items-center justify-center text-2xl">
        {teacher.photoUrl ? (
          <img src={teacher.photoUrl} alt={teacher.name} className="w-full h-full rounded-full object-cover" />
        ) : (
          '👩‍🏫'
        )}
      </div>
      <h3 className="text-center font-bold text-slate mb-1">{teacher.name}</h3>
      {teacher.subject && (
        <p className="text-center text-sm text-rose-400">{teacher.subject}</p>
      )}
    </Link>
  );
}

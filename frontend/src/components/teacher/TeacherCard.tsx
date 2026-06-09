import { Link } from 'react-router-dom';
import type { Teacher } from '../../types/teacher';

interface TeacherCardProps {
  teacher: Teacher;
}

function getInitials(name: string) {
  return name
    .replace(/багш/gi, '')
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0))
    .join('')
    .toUpperCase() || 'Б';
}

export function TeacherCard({ teacher }: TeacherCardProps) {
  return (
    <Link
      to={`/teacher/${teacher.slug}`}
      className="group block no-underline"
    >
      <article className="soft-card relative overflow-hidden rounded-[1.75rem] p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(159,45,87,0.16)]">
        <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-primary-light/25 blur-xl transition group-hover:bg-primary-light/40" />
        <div className="relative mx-auto mb-4 grid h-20 w-20 place-items-center overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-white to-soft-bg text-xl font-black text-primary-dark shadow-inner ring-1 ring-primary/10">
          {teacher.photoUrl ? (
            <img src={teacher.photoUrl} alt={teacher.name} className="h-full w-full object-cover" />
          ) : (
            <span>{getInitials(teacher.name)}</span>
          )}
        </div>
        <h3 className="relative text-base font-black text-warm sm:text-lg">{teacher.name}</h3>
        {teacher.subject && (
          <p className="relative mt-1 text-sm font-semibold text-primary-dark/60">{teacher.subject}</p>
        )}
        <div className="relative mt-4 inline-flex items-center rounded-full bg-white/70 px-3 py-1 text-xs font-bold text-primary-dark/65 ring-1 ring-primary/10">
          Захидал харах →
        </div>
      </article>
    </Link>
  );
}

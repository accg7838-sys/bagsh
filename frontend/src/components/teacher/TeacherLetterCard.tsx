import type { TeacherLetter } from '../../types/message';

interface TeacherLetterCardProps {
  letter: TeacherLetter;
}

export function TeacherLetterCard({ letter }: TeacherLetterCardProps) {
  return (
    <article className="soft-card relative overflow-hidden rounded-[1.75rem] p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_22px_58px_rgba(159,45,87,0.13)]">
      <div className="absolute right-5 top-5 text-2xl opacity-20">♥</div>
      <div className="mb-4 flex items-start gap-3">
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-primary/10 text-xl text-primary-dark">
          💌
        </span>
        <div>
          <p className="font-black text-warm">{letter.studentName}</p>
          {letter.className && (
            <p className="mt-0.5 text-xs font-semibold text-primary-dark/55">{letter.className} анги</p>
          )}
        </div>
      </div>
      <p className="relative text-[15px] leading-8 text-slate/80">{letter.content}</p>
    </article>
  );
}

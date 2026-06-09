import type { TeacherLetter } from '../../types/message';

interface TeacherLetterCardProps {
  letter: TeacherLetter;
}

export function TeacherLetterCard({ letter }: TeacherLetterCardProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-rose-100 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-3 mb-3">
        <span className="text-2xl">💌</span>
        <div>
          <p className="font-bold text-slate">{letter.studentName}</p>
          {letter.className && (
            <p className="text-xs text-rose-400">{letter.className} анги</p>
          )}
        </div>
      </div>
      <p className="text-slate/80 leading-relaxed">{letter.content}</p>
    </div>
  );
}

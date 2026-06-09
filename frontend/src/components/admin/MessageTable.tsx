import { cn } from '../../utils/cn';
import type { MessageStatus } from '../../types/message';

interface MessageItem {
  id: number;
  studentName: string;
  className?: string | null;
  content: string;
  status: MessageStatus;
  teacher?: { name: string; slug: string };
  teacherId?: number;
  createdAt?: string;
}

interface MessageTableProps {
  messages: MessageItem[];
  type: 'rain' | 'teacher';
  onApprove?: (id: number) => Promise<void>;
  onReject?: (id: number) => Promise<void>;
  onDelete?: (id: number) => Promise<void>;
}

export function MessageTable({ messages, type, onApprove, onReject, onDelete }: MessageTableProps) {
  if (messages.length === 0) {
    return (
      <div className="rounded-[1.5rem] bg-white/60 py-12 text-center text-slate/50 ring-1 ring-primary/10">
        <p className="mb-3 text-5xl">📭</p>
        <p className="font-semibold">Одоогоор сэтгэгдэл байхгүй байна.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[760px]">
        <thead>
          <tr className="border-b border-primary/10">
            <th className="px-4 py-3 text-left text-sm font-bold text-slate/60">Сурагч</th>
            <th className="px-4 py-3 text-left text-sm font-bold text-slate/60">Анги</th>
            <th className="px-4 py-3 text-left text-sm font-bold text-slate/60">Сэтгэгдэл</th>
            <th className="px-4 py-3 text-left text-sm font-bold text-slate/60">Төлөв</th>
            {type === 'teacher' && (
              <th className="px-4 py-3 text-left text-sm font-bold text-slate/60">Багш</th>
            )}
            <th className="px-4 py-3 text-right text-sm font-bold text-slate/60">Үйлдэл</th>
          </tr>
        </thead>
        <tbody>
          {messages.map((msg) => (
            <tr key={msg.id} className="border-b border-primary/10 transition hover:bg-primary/5">
              <td className="px-4 py-4 font-bold text-warm">{msg.studentName}</td>
              <td className="px-4 py-4 text-sm text-slate/60">{msg.className || '-'}</td>
              <td className="max-w-xs truncate px-4 py-4 text-sm text-slate/80">
                {msg.content}
              </td>
              <td className="px-4 py-4">
                <span
                  className={cn(
                    'inline-flex rounded-full px-3 py-1 text-xs font-bold',
                    msg.status === 'APPROVED' && 'bg-green-100 text-green-700',
                    msg.status === 'PENDING' && 'bg-yellow-100 text-yellow-700',
                    msg.status === 'REJECTED' && 'bg-red-100 text-red-700'
                  )}
                >
                  {msg.status === 'APPROVED' ? 'Зөвшөөрсөн' : msg.status === 'PENDING' ? 'Хүлээгдэж байна' : 'Татгалзсан'}
                </span>
              </td>
              {type === 'teacher' && msg.teacher && (
                <td className="px-4 py-4 text-sm text-slate/60">{msg.teacher.name}</td>
              )}
              <td className="px-4 py-4">
                <div className="flex items-center justify-end gap-2">
                  {msg.status !== 'APPROVED' && onApprove && (
                    <button
                      onClick={() => onApprove(msg.id)}
                      className="rounded-xl bg-green-50 px-3 py-2 text-xs font-bold text-green-700 transition-colors hover:bg-green-100 cursor-pointer"
                    >
                      ✓ Зөвшөөрөх
                    </button>
                  )}
                  {msg.status !== 'REJECTED' && onReject && (
                    <button
                      onClick={() => onReject(msg.id)}
                      className="rounded-xl bg-red-50 px-3 py-2 text-xs font-bold text-red-600 transition-colors hover:bg-red-100 cursor-pointer"
                    >
                      ✕ Татгалзах
                    </button>
                  )}
                  {onDelete && (
                    <button
                      onClick={() => onDelete(msg.id)}
                      className="rounded-xl bg-slate-50 px-3 py-2 text-xs font-bold text-slate/60 transition-colors hover:bg-slate-100 cursor-pointer"
                    >
                      🗑 Устгах
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

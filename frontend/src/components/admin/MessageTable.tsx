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
      <div className="text-center py-12 text-slate/50">
        <p className="text-4xl mb-3">📭</p>
        <p>Одоогоор санваартнууд байхгүй байна.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-3 px-4 text-sm font-medium text-slate/70">Сурагч</th>
            <th className="text-left py-3 px-4 text-sm font-medium text-slate/70">Анги</th>
            <th className="text-left py-3 px-4 text-sm font-medium text-slate/70">Санваартан</th>
            <th className="text-left py-3 px-4 text-sm font-medium text-slate/70">Төлөв</th>
            {type === 'teacher' && (
              <th className="text-left py-3 px-4 text-sm font-medium text-slate/70">Багш</th>
            )}
            <th className="text-right py-3 px-4 text-sm font-medium text-slate/70">Үйлдэл</th>
          </tr>
        </thead>
        <tbody>
          {messages.map((msg) => (
            <tr key={msg.id} className="border-b border-gray-100 hover:bg-gray-50">
              <td className="py-3 px-4 font-medium text-slate">{msg.studentName}</td>
              <td className="py-3 px-4 text-sm text-slate/60">{msg.className || '-'}</td>
              <td className="py-3 px-4 text-sm text-slate max-w-xs truncate">
                {msg.content}
              </td>
              <td className="py-3 px-4">
                <span
                  className={cn(
                    'inline-block px-2 py-0.5 rounded-full text-xs font-medium',
                    msg.status === 'APPROVED' && 'bg-green-100 text-green-700',
                    msg.status === 'PENDING' && 'bg-yellow-100 text-yellow-700',
                    msg.status === 'REJECTED' && 'bg-red-100 text-red-700'
                  )}
                >
                  {msg.status === 'APPROVED' ? 'Зөвшөөрсөн' : msg.status === 'PENDING' ? 'Хүлээгдэж' : 'Татгалзсан'}
                </span>
              </td>
              {type === 'teacher' && msg.teacher && (
                <td className="py-3 px-4 text-sm text-slate/60">{msg.teacher.name}</td>
              )}
              <td className="py-3 px-4">
                <div className="flex items-center justify-end gap-1.5">
                  {msg.status !== 'APPROVED' && onApprove && (
                    <button
                      onClick={() => onApprove(msg.id)}
                      className="px-2 py-1 text-xs rounded-lg bg-green-50 text-green-600 hover:bg-green-100 transition-colors cursor-pointer"
                    >
                      ✓ Зөвшөөрөх
                    </button>
                  )}
                  {msg.status !== 'REJECTED' && onReject && (
                    <button
                      onClick={() => onReject(msg.id)}
                      className="px-2 py-1 text-xs rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition-colors cursor-pointer"
                    >
                      ✕ Татгалзах
                    </button>
                  )}
                  {onDelete && (
                    <button
                      onClick={() => onDelete(msg.id)}
                      className="px-2 py-1 text-xs rounded-lg bg-gray-50 text-gray-500 hover:bg-gray-100 transition-colors cursor-pointer"
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

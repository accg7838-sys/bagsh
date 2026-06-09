import { useState, useEffect, useCallback } from 'react';
import { MessageTable } from '../../components/admin/MessageTable';
import {
  getAdminRainComments,
  getAdminTeacherLetters,
  approveRainComment,
  rejectRainComment,
  deleteRainComment,
  approveTeacherLetter,
  rejectTeacherLetter,
  deleteTeacherLetter,
} from '../../services/adminService';
import type { RainComment, TeacherLetter } from '../../types/message';

type Tab = 'rain' | 'teacher';

export function AdminMessagesPage() {
  const [tab, setTab] = useState<Tab>('rain');
  const [rainComments, setRainComments] = useState<RainComment[]>([]);
  const [teacherLetters, setTeacherLetters] = useState<TeacherLetter[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      if (tab === 'rain') {
        const data = await getAdminRainComments();
        setRainComments(data);
      } else {
        const data = await getAdminTeacherLetters();
        setTeacherLetters(data);
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }, [tab]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleApproveRain = async (id: number) => {
    await approveRainComment(id);
    fetchData();
  };

  const handleRejectRain = async (id: number) => {
    await rejectRainComment(id);
    fetchData();
  };

  const handleDeleteRain = async (id: number) => {
    if (!confirm('Устгахдаа итгэлтэй байна уу?')) return;
    await deleteRainComment(id);
    fetchData();
  };

  const handleApproveLetter = async (id: number) => {
    await approveTeacherLetter(id);
    fetchData();
  };

  const handleRejectLetter = async (id: number) => {
    await rejectTeacherLetter(id);
    fetchData();
  };

  const handleDeleteLetter = async (id: number) => {
    if (!confirm('Устгахдаа итгэлтэй байна уу?')) return;
    await deleteTeacherLetter(id);
    fetchData();
  };

  const tabs: { key: Tab; label: string; count: number }[] = [
    { key: 'rain', label: '🌧 Нийтийн сэтгэгдэл', count: rainComments.length },
    { key: 'teacher', label: '💌 Багшид захидал', count: teacherLetters.length },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate mb-6">💬 Санваартнууд</h2>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-white rounded-2xl p-1.5 shadow-sm border border-gray-200 w-fit">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer ${
              tab === t.key
                ? 'bg-rose-500 text-white shadow-sm'
                : 'text-slate/60 hover:text-slate'
            }`}
          >
            {t.label} ({t.count})
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-12 text-slate/50">Ачаалж байна...</div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4">
          {tab === 'rain' ? (
            <MessageTable
              messages={rainComments.map(c => ({ ...c, status: c.status || 'PENDING' as const }))}
              type="rain"
              onApprove={handleApproveRain}
              onReject={handleRejectRain}
              onDelete={handleDeleteRain}
            />
          ) : (
            <MessageTable
              messages={teacherLetters.map((l) => ({
                ...l,
                status: l.status || 'PENDING',
              }))}
              type="teacher"
              onApprove={handleApproveLetter}
              onReject={handleRejectLetter}
              onDelete={handleDeleteLetter}
            />
          )}
        </div>
      )}
    </div>
  );
}

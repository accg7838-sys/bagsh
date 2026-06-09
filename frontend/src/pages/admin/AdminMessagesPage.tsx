/* eslint-disable react-hooks/set-state-in-effect */
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
      <div className="mb-6">
        <p className="text-sm font-bold uppercase tracking-[0.22em] text-primary-dark/45">Messages</p>
        <h2 className="mt-1 text-3xl font-black tracking-[-0.04em] text-warm">Сэтгэгдлүүд</h2>
      </div>

      <div className="mb-6 flex w-fit gap-1 rounded-2xl bg-white/70 p-1.5 shadow-sm ring-1 ring-primary/10 backdrop-blur">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`rounded-xl px-4 py-2 text-sm font-bold transition-all cursor-pointer ${
              tab === t.key
                ? 'bg-primary text-white shadow-sm'
                : 'text-slate/60 hover:bg-white hover:text-warm'
            }`}
          >
            {t.label} ({t.count})
          </button>
        ))}
      </div>

      {loading ? (
        <div className="rounded-[1.75rem] bg-white/60 py-12 text-center font-semibold text-slate/50 ring-1 ring-primary/10">Ачаалж байна...</div>
      ) : (
        <div className="soft-card rounded-[1.75rem] p-4">
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

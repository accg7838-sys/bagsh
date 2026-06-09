import { useState, useEffect } from 'react';
import { getDashboard } from '../../services/adminService';
import type { DashboardData } from '../../types/admin';

export function AdminDashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDashboard()
      .then(setData)
      .catch(() => {
        setData({
          stats: { teacherCount: 0, rainCommentCount: 0, teacherLetterCount: 0, pendingCount: 0 },
          recentMessages: [],
        });
      })
      .finally(() => setLoading(false));
  }, []);

  const statCards = [
    { label: 'Багш нар', value: data?.stats.teacherCount || 0, icon: '🧑‍🏫', color: 'bg-primary/10 text-primary-dark' },
    { label: 'Нийтийн сэтгэгдэл', value: data?.stats.rainCommentCount || 0, icon: '💬', color: 'bg-blue-50 text-blue-600' },
    { label: 'Хувийн захидал', value: data?.stats.teacherLetterCount || 0, icon: '💌', color: 'bg-purple-50 text-purple-600' },
    { label: 'Хүлээгдэж буй', value: data?.stats.pendingCount || 0, icon: '⏳', color: 'bg-yellow-50 text-yellow-600' },
  ];

  return (
    <div>
      <div className="mb-6">
        <p className="text-sm font-bold uppercase tracking-[0.22em] text-primary-dark/45">Overview</p>
        <h2 className="mt-1 text-3xl font-black tracking-[-0.04em] text-warm">Хяналтын самбар</h2>
      </div>

      {loading ? (
        <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-36 animate-pulse rounded-[1.75rem] bg-white/60 ring-1 ring-primary/10" />
          ))}
        </div>
      ) : (
        <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {statCards.map((card) => (
            <div key={card.label} className="soft-card rounded-[1.75rem] p-5">
              <span className={`mb-4 grid h-12 w-12 place-items-center rounded-2xl ${card.color} text-xl`}>
                {card.icon}
              </span>
              <p className="text-4xl font-black tracking-[-0.05em] text-warm">{card.value}</p>
              <p className="mt-1 text-sm font-semibold text-slate/50">{card.label}</p>
            </div>
          ))}
        </div>
      )}

      <div className="soft-card rounded-[1.75rem] p-6">
        <h3 className="mb-4 text-lg font-black text-warm">🕐 Сүүлийн сэтгэгдлүүд</h3>
        {data?.recentMessages && data.recentMessages.length > 0 ? (
          <div className="space-y-3">
            {data.recentMessages.map((msg) => (
              <div key={msg.id} className="flex items-start gap-3 rounded-2xl bg-white/70 p-4 ring-1 ring-primary/10">
                <span className="grid h-10 w-10 place-items-center rounded-2xl bg-primary/10 text-primary-dark">💬</span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-black text-warm">{msg.studentName}</span>
                    <span className="text-xs text-slate/40">{msg.className}</span>
                    <span className={`rounded-full px-2 py-0.5 text-xs font-bold ${
                      msg.status === 'APPROVED' ? 'bg-green-100 text-green-700' :
                      msg.status === 'PENDING' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {msg.status === 'APPROVED' ? 'Зөвшөөрсөн' : msg.status === 'PENDING' ? 'Хүлээгдэж' : 'Татгалзсан'}
                    </span>
                  </div>
                  <p className="truncate text-sm text-slate/60">{msg.content}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="rounded-2xl bg-white/55 py-8 text-center text-slate/40">Одоогоор сэтгэгдэл байхгүй</p>
        )}
      </div>
    </div>
  );
}

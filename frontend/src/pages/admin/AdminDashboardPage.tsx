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
    { label: 'Багш нар', value: data?.stats.teacherCount || 0, icon: '👩‍🏫', color: 'bg-rose-50 text-rose-600' },
    { label: 'Нийтийн сэтгэгдэл', value: data?.stats.rainCommentCount || 0, icon: '💬', color: 'bg-blue-50 text-blue-600' },
    { label: 'Хувийн захидал', value: data?.stats.teacherLetterCount || 0, icon: '💌', color: 'bg-purple-50 text-purple-600' },
    { label: 'Хүлээгдэж буй', value: data?.stats.pendingCount || 0, icon: '⏳', color: 'bg-yellow-50 text-yellow-600' },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate mb-6">📊 Хяналтын самбар</h2>

      {loading ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-200 animate-pulse">
              <div className="h-4 bg-gray-100 rounded w-1/2 mb-3" />
              <div className="h-8 bg-gray-100 rounded w-1/3" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {statCards.map((card) => (
            <div key={card.label} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-200">
              <div className="flex items-center gap-3 mb-2">
                <span className={`w-10 h-10 rounded-xl ${card.color} flex items-center justify-center text-lg`}>
                  {card.icon}
                </span>
              </div>
              <p className="text-3xl font-bold text-slate">{card.value}</p>
              <p className="text-sm text-slate/50 mt-1">{card.label}</p>
            </div>
          ))}
        </div>
      )}

      {/* Recent messages */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-slate mb-4">🕐 Сүүлийн сэтгэгдлүүд</h3>
        {data?.recentMessages && data.recentMessages.length > 0 ? (
          <div className="space-y-3">
            {data.recentMessages.map((msg) => (
              <div key={msg.id} className="flex items-start gap-3 p-3 rounded-xl bg-gray-50">
                <span className="text-lg mt-0.5">💬</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm text-slate">{msg.studentName}</span>
                    <span className="text-xs text-slate/40">{msg.className}</span>
                    <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                      msg.status === 'APPROVED' ? 'bg-green-100 text-green-600' :
                      msg.status === 'PENDING' ? 'bg-yellow-100 text-yellow-600' :
                      'bg-red-100 text-red-600'
                    }`}>
                      {msg.status === 'APPROVED' ? '✓' : msg.status === 'PENDING' ? '⏳' : '✕'}
                    </span>
                  </div>
                  <p className="text-sm text-slate/60 truncate">{msg.content}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-slate/40 py-8">Одоогоор сэтгэгдэл байхгүй</p>
        )}
      </div>
    </div>
  );
}

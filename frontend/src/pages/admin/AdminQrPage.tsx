import { useState, useEffect } from 'react';
import { Button } from '../../components/ui/Button';
import { getAdminTeachers, getTeacherQR } from '../../services/adminService';
import type { Teacher } from '../../types/teacher';

interface QrData {
  teacher: { id: number; name: string; slug: string };
  url: string;
  qrCode: string;
}

export function AdminQrPage() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [qrData, setQrData] = useState<Record<number, QrData>>({});
  const [loading, setLoading] = useState(true);
  const [loadingQr, setLoadingQr] = useState<Record<number, boolean>>({});

  useEffect(() => {
    getAdminTeachers()
      .then(setTeachers)
      .catch(() => setTeachers([]))
      .finally(() => setLoading(false));
  }, []);

  const loadQr = async (teacherId: number) => {
    setLoadingQr((prev) => ({ ...prev, [teacherId]: true }));
    try {
      const data = await getTeacherQR(teacherId);
      setQrData((prev) => ({ ...prev, [teacherId]: data }));
    } catch {
      // ignore
    } finally {
      setLoadingQr((prev) => ({ ...prev, [teacherId]: false }));
    }
  };

  const copyLink = (url: string) => {
    navigator.clipboard.writeText(url).then(() => {
      alert('Холбоос хуулагдлаа!');
    });
  };

  const downloadQr = (qrCode: string, name: string) => {
    const a = document.createElement('a');
    a.href = qrCode;
    a.download = `qr-${name}.png`;
    a.click();
  };

  if (loading) {
    return <div className="text-center py-12 text-slate/50">Ачаалж байна...</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate mb-6">📱 Багш нарын QR код</h2>

      {teachers.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-gray-200">
          <p className="text-4xl mb-3">📱</p>
          <p className="text-slate/50">Одоогоор багш бүртгэгдээгүй байна</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {teachers.map((teacher) => (
            <div key={teacher.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 text-center">
              <h3 className="font-bold text-slate mb-3">{teacher.name}</h3>

              {qrData[teacher.id] ? (
                <div className="space-y-3">
                  <img
                    src={qrData[teacher.id].qrCode}
                    alt={`QR for ${teacher.name}`}
                    className="mx-auto rounded-xl border border-gray-100 w-48 h-48"
                  />
                  <p className="text-xs text-slate/40 break-all font-mono">
                    {qrData[teacher.id].url}
                  </p>
                  <div className="flex gap-2 justify-center">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => copyLink(qrData[teacher.id].url)}
                    >
                      📋 Хуулах
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => downloadQr(qrData[teacher.id].qrCode, teacher.slug)}
                    >
                      ⬇️ Татах
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="py-6">
                  <p className="text-5xl text-slate/20 mb-4">📱</p>
                  <Button
                    size="sm"
                    onClick={() => loadQr(teacher.id)}
                    disabled={loadingQr[teacher.id]}
                  >
                    {loadingQr[teacher.id] ? 'Үүсгэж байна...' : '🔍 QR үүсгэх'}
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

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
    return <div className="rounded-[1.75rem] bg-white/60 py-12 text-center font-semibold text-slate/50 ring-1 ring-primary/10">Ачаалж байна...</div>;
  }

  return (
    <div>
      <div className="mb-6">
        <p className="text-sm font-bold uppercase tracking-[0.22em] text-primary-dark/45">QR links</p>
        <h2 className="mt-1 text-3xl font-black tracking-[-0.04em] text-warm">Багш нарын QR код</h2>
      </div>

      {teachers.length === 0 ? (
        <div className="soft-card rounded-[1.75rem] p-12 text-center">
          <p className="mb-3 text-5xl">📱</p>
          <p className="font-semibold text-slate/50">Одоогоор багш бүртгэгдээгүй байна</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {teachers.map((teacher) => (
            <div key={teacher.id} className="soft-card rounded-[1.75rem] p-6 text-center">
              <h3 className="mb-3 text-lg font-black text-warm">{teacher.name}</h3>

              {qrData[teacher.id] ? (
                <div className="space-y-3">
                  <img
                    src={qrData[teacher.id].qrCode}
                    alt={`QR for ${teacher.name}`}
                    className="mx-auto h-48 w-48 rounded-2xl border border-primary/10 bg-white p-2 shadow-inner"
                  />
                  <p className="break-all rounded-2xl bg-white/65 p-3 font-mono text-xs text-slate/45 ring-1 ring-primary/10">
                    {qrData[teacher.id].url}
                  </p>
                  <div className="flex justify-center gap-2">
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
                  <p className="mb-4 text-5xl text-slate/20">📱</p>
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

import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { TeacherLetterCard } from '../components/teacher/TeacherLetterCard';
import { getTeacherLetters, verifyTeacherPin } from '../services/teacherService';
import type { Teacher } from '../types/teacher';
import type { TeacherLetter } from '../types/message';

function getInitials(name?: string) {
  if (!name) return 'Б';
  return name
    .replace(/багш/gi, '')
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0))
    .join('')
    .toUpperCase() || 'Б';
}

export function TeacherLettersPage() {
  const { teacherSlug } = useParams<{ teacherSlug: string }>();
  const [teacher, setTeacher] = useState<Teacher | null>(null);
  const [letters, setLetters] = useState<TeacherLetter[]>([]);
  const [loading, setLoading] = useState(true);
  const [pinRequired, setPinRequired] = useState(false);
  const [pinVerified, setPinVerified] = useState(false);
  const [pinCode, setPinCode] = useState('');
  const [pinError, setPinError] = useState('');
  const [checkingPin, setCheckingPin] = useState(false);

  useEffect(() => {
    if (!teacherSlug) return;

    getTeacherLetters(teacherSlug)
      .then((data) => {
        setTeacher(data.teacher);
        setLetters(data.letters);
        setPinVerified(true);
      })
      .catch((err) => {
        if (err?.response?.status === 404) {
          setPinRequired(true);
        }
      })
      .finally(() => setLoading(false));
  }, [teacherSlug]);

  const handlePinSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!teacherSlug || !pinCode.trim()) return;

    setCheckingPin(true);
    setPinError('');

    try {
      const result = await verifyTeacherPin(teacherSlug, pinCode);
      if (result.verified) {
        setPinVerified(true);
        const data = await getTeacherLetters(teacherSlug);
        setTeacher(data.teacher);
        setLetters(data.letters);
      }
    } catch {
      setPinError('PIN код буруу байна');
    } finally {
      setCheckingPin(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-warm-gradient px-4">
        <div className="rounded-3xl bg-white/70 px-8 py-6 text-center shadow-xl ring-1 ring-primary/10 backdrop-blur">
          <div className="mx-auto mb-3 h-10 w-10 animate-spin rounded-full border-4 border-primary/15 border-t-primary" />
          <p className="font-semibold text-primary-dark/65">Захидлуудыг ачаалж байна...</p>
        </div>
      </div>
    );
  }

  if (pinRequired && !pinVerified) {
    return (
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-warm-gradient px-4 py-8">
        <div className="decorative-grid fixed inset-0 pointer-events-none" />
        <div className="glass-card relative z-10 w-full max-w-sm rounded-[2rem] p-8 text-center">
          <div className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-3xl bg-primary/10 text-3xl text-primary-dark">
            🔐
          </div>
          <h2 className="mb-2 text-2xl font-black tracking-[-0.03em] text-warm">Баталгаажуулах</h2>
          <p className="mb-6 text-sm leading-6 text-slate/60">
            Энэ хуудас багшийн хувийн захидлын булан тул PIN код оруулна уу.
          </p>

          <form onSubmit={handlePinSubmit} className="space-y-4">
            <Input
              value={pinCode}
              onChange={(e) => setPinCode(e.target.value)}
              placeholder="PIN код"
              maxLength={10}
              type="password"
              error={pinError}
            />
            <Button type="submit" disabled={checkingPin} className="w-full">
              {checkingPin ? 'Шалгаж байна...' : 'Нэвтрэх'}
            </Button>
          </form>

          <Link to="/teacher" className="mt-5 block text-sm font-semibold text-primary-dark/65 no-underline transition hover:text-primary">
            ← Багш нар руу буцах
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-warm-gradient px-4 py-6 sm:px-6 sm:py-8">
      <div className="decorative-grid fixed inset-0 pointer-events-none" />
      <div className="relative z-10 mx-auto max-w-4xl">
        <div className="mb-8 flex items-center justify-between gap-3">
          <Link to="/teacher">
            <Button variant="ghost" size="sm">← Бүх багш</Button>
          </Link>
          <Link to="/write">
            <Button size="sm">✍️ Захидал бичих</Button>
          </Link>
        </div>

        <section className="glass-card mb-8 rounded-[2rem] p-7 text-center sm:p-10">
          <div className="relative mx-auto mb-5 grid h-24 w-24 place-items-center overflow-hidden rounded-[2rem] bg-gradient-to-br from-white to-soft-bg text-2xl font-black text-primary-dark shadow-inner ring-1 ring-primary/10">
            {teacher?.photoUrl ? (
              <img src={teacher.photoUrl} alt={teacher?.name} className="h-full w-full object-cover" />
            ) : (
              <span>{getInitials(teacher?.name)}</span>
            )}
          </div>
          <h1 className="text-3xl font-black tracking-[-0.04em] text-warm sm:text-5xl">{teacher?.name || 'Багш'}</h1>
          {teacher?.subject && (
            <p className="mt-2 text-base font-semibold text-primary-dark/60">{teacher.subject}</p>
          )}
          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate/60">
            Хүүхдүүдийн бичсэн талархлын захидлуудыг нэг дор, зөөлөн ягаан card хэлбэрээр харуулж байна.
          </p>
        </section>

        {letters.length === 0 ? (
          <div className="rounded-[2rem] bg-white/70 p-12 text-center shadow-lg ring-1 ring-primary/10 backdrop-blur">
            <p className="mb-4 text-6xl">📭</p>
            <p className="text-xl font-black text-warm/70">Одоогоор захидал байхгүй байна</p>
            <p className="mt-2 text-sm text-slate/45">Хүүхдүүд тань руу захидал бичихэд энд харагдах болно.</p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {letters.map((letter) => (
              <TeacherLetterCard key={letter.id} letter={letter} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

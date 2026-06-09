import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { TeacherLetterCard } from '../components/teacher/TeacherLetterCard';
import { getTeacherLetters, verifyTeacherPin } from '../services/teacherService';
import type { Teacher } from '../types/teacher';
import type { TeacherLetter } from '../types/message';

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
        // Now fetch letters
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
      <div className="min-h-[calc(100vh-56px)] flex items-center justify-center">
        <div className="text-2xl text-primary/30 animate-pulse">Ачаалж байна... 🌸</div>
      </div>
    );
  }

  // PIN screen
  if (pinRequired && !pinVerified) {
    return (
      <div className="min-h-[calc(100vh-56px)] flex items-center justify-center px-4">
        <div className="max-w-sm w-full bg-white rounded-3xl p-8 shadow-xl border border-primary/10 text-center">
          <div className="text-5xl mb-4">🔐</div>
          <h2 className="text-xl font-bold text-slate mb-2">Баталгаажуулах</h2>
          <p className="text-slate/60 text-sm mb-6">
            Энэ хуудас руу нэвтрэхийн тулд PIN код оруулна уу
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

          <Link to="/teacher" className="block mt-4 text-sm text-primary hover:text-primary no-underline">
            ← Багш нар руу буцах
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-56px)] px-4 py-8">
      <div className="max-w-2xl mx-auto">
        {/* Teacher info */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center text-3xl">
            {teacher?.photoUrl ? (
              <img src={teacher.photoUrl} alt={teacher?.name} className="w-full h-full rounded-full object-cover" />
            ) : (
              '👩‍🏫'
            )}
          </div>
          <h2 className="text-3xl font-bold text-primary mb-1">{teacher?.name || 'Багш'}</h2>
          {teacher?.subject && (
            <p className="text-slate/60">{teacher.subject}</p>
          )}
        </div>

        {/* Letters */}
        {letters.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-3xl border border-primary/10">
            <p className="text-5xl mb-4">📭</p>
            <p className="text-xl text-slate/50">Одоогоор захидал байхгүй байна</p>
            <p className="text-sm text-slate/40 mt-2">Хүүхдүүд тань руу захидал бичихэд энд харагдах болно</p>
          </div>
        ) : (
          <div className="space-y-4">
            {letters.map((letter) => (
              <TeacherLetterCard key={letter.id} letter={letter} />
            ))}
          </div>
        )}

        <div className="mt-8 text-center">
          <Link to="/teacher">
            <Button variant="ghost">← Бүх багш нар</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Textarea } from '../components/ui/Textarea';
import { Select } from '../components/ui/Select';
import { submitRainComment, submitTeacherLetter } from '../services/messageService';
import { getTeachers } from '../services/teacherService';
import type { Teacher } from '../types/teacher';

export function WriteMessagePage() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [studentName, setStudentName] = useState('');
  const [className, setClassName] = useState('');
  const [messageType, setMessageType] = useState('public');
  const [selectedTeacher, setSelectedTeacher] = useState('');
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    getTeachers()
      .then(setTeachers)
      .catch(() => {
        setTeachers([
          { id: 1, name: 'Батболд багш', subject: 'Математик', slug: 'batbold-bagsh' },
          { id: 2, name: 'Сарантуяа багш', subject: 'Монгол хэл', slug: 'sarantuya-bagsh' },
          { id: 3, name: 'Оюун багш', subject: 'Англи хэл', slug: 'oyun-bagsh' },
        ]);
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!studentName.trim()) {
      setError('Нэрээ оруулна уу');
      return;
    }
    if (content.trim().length < 5) {
      setError('Сэтгэгдэл хамгийн багадаа 5 тэмдэгт байх ёстой');
      return;
    }

    setSubmitting(true);
    try {
      if (messageType === 'teacher') {
        if (!selectedTeacher) {
          setError('Багшаа сонгоно уу');
          setSubmitting(false);
          return;
        }
        await submitTeacherLetter({
          teacherId: parseInt(selectedTeacher),
          studentName: studentName.trim(),
          className: className.trim() || undefined,
          content: content.trim(),
        });
      } else {
        await submitRainComment({
          studentName: studentName.trim(),
          className: className.trim() || undefined,
          content: content.trim(),
        });
      }

      setSuccess('Таны талархал амжилттай илгээгдлээ! Админ зөвшөөрсний дараа харагдана.');
      setStudentName('');
      setClassName('');
      setContent('');
    } catch (err: unknown) {
      const message = err instanceof Error ? (err as { response?: { data?: { error?: string } } }).response?.data?.error || err.message : '';
      setError(message || 'Алдаа гарлаа. Дахин оролдоно уу.');
    } finally {
      setSubmitting(false);
    }
  };

  const messageTypeOptions = [
    { value: 'public', label: '🌧 Нийтийн талархлын бороо' },
    { value: 'teacher', label: '💌 Сонгосон багшид захидал' },
  ];

  const teacherOptions = [
    { value: '', label: 'Багшаа сонгоно уу...' },
    ...teachers.map((t) => ({ value: t.id.toString(), label: t.name })),
  ];

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-warm-gradient px-4 py-8">
      <div className="decorative-grid fixed inset-0 pointer-events-none" />
      <div className="relative z-10 grid w-full max-w-5xl items-center gap-8 lg:grid-cols-[0.85fr_1fr]">
        <section className="hidden lg:block">
          <div className="soft-pill px-4 py-2 text-sm font-bold">💗 Багшдаа хэлэх сайхан үг</div>
          <h1 className="mt-6 text-5xl font-black leading-tight tracking-[-0.05em] text-warm">
            Чин сэтгэлийн талархлаа үлдээгээрэй
          </h1>
          <p className="mt-5 max-w-md text-base leading-8 text-slate/65">
            Нийтийн бороонд оруулах эсвэл яг нэг багшид хувийн захидал болгон илгээж болно.
          </p>
          <div className="mt-8 space-y-3">
            {['Зөөлөн ягаан clean UI', 'Бүх багшид тохиромжтой нейтрал дизайн', 'Админ зөвшөөрсний дараа харагдана'].map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-2xl bg-white/58 px-4 py-3 text-sm font-semibold text-slate/65 ring-1 ring-primary/10 backdrop-blur">
                <span className="grid h-8 w-8 place-items-center rounded-xl bg-primary/10 text-primary-dark">✓</span>
                {item}
              </div>
            ))}
          </div>
        </section>

        <div className="w-full">
          <div className="mb-5 text-center lg:text-left">
            <Link to="/" className="text-sm font-semibold text-primary-dark/60 no-underline transition hover:text-primary">
              ← Нүүр рүү буцах
            </Link>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] text-warm sm:text-4xl">Талархал бичих</h2>
            <p className="mt-2 text-sm text-slate/55">Багш нартаа урам өгөх үгээ бичээрэй</p>
          </div>

          <form onSubmit={handleSubmit} className="glass-card rounded-[2rem] p-5 shadow-xl sm:p-7">
            <div className="grid gap-4 sm:grid-cols-2">
              <Input
                label="Таны нэр"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="Жишээ: Анужин"
                maxLength={50}
              />

              <Input
                label="Анги (заавал биш)"
                value={className}
                onChange={(e) => setClassName(e.target.value)}
                placeholder="Жишээ: 10А"
                maxLength={20}
              />
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Select
                label="Төрөл"
                value={messageType}
                onChange={(e) => setMessageType(e.target.value)}
                options={messageTypeOptions}
              />

              {messageType === 'teacher' ? (
                <Select
                  label="Багш сонгох"
                  value={selectedTeacher}
                  onChange={(e) => setSelectedTeacher(e.target.value)}
                  options={teacherOptions}
                />
              ) : (
                <div className="rounded-2xl bg-white/55 p-4 text-sm leading-6 text-slate/55 ring-1 ring-primary/10">
                  Нийтийн талархал нь бороо шиг унадаг card дээр харагдана.
                </div>
              )}
            </div>

            <div className="mt-4">
              <Textarea
                label="Сэтгэгдэл"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Багшдаа хандаж сэтгэгдлээ бичээрэй..."
                maxLength={500}
                rows={6}
              />
              <p className="mt-2 text-right text-xs font-semibold text-slate/40">{content.length}/500</p>
            </div>

            {error && (
              <div className="mt-4 rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600 ring-1 ring-red-100">{error}</div>
            )}

            {success && (
              <div className="mt-4 rounded-2xl bg-green-50 px-4 py-3 text-sm font-semibold text-green-700 ring-1 ring-green-100">{success}</div>
            )}

            <Button type="submit" disabled={submitting} className="mt-5 w-full">
              {submitting ? 'Илгээж байна...' : '✨ Илгээх'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

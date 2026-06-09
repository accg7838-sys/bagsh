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

      setSuccess('Таны сэтгэгдэл амжилттай илгээгдлээ! Админ зөвшөөрсний дараа харагдах болно.');
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
    { value: 'public', label: '🌧 Нийтийн сэтгэгдэл' },
    { value: 'teacher', label: '💌 Багшид захидал' },
  ];

  const teacherOptions = [
    { value: '', label: 'Багшаа сонгоно уу...' },
    ...teachers.map((t) => ({ value: t.id.toString(), label: t.name })),
  ];

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full">
        <div className="text-center mb-6">
          <Link to="/" className="text-sm text-warm/50 hover:text-primary transition-colors no-underline">
            ← Буцах
          </Link>
          <h2 className="text-2xl font-bold text-warm mt-2 mb-1">Сэтгэгдэл үлдээх</h2>
          <p className="text-sm text-slate/50">Багш нартаа талархлаа илэрхийлээрэй</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 shadow-lg border border-primary/10 space-y-4">
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

          <Select
            label="Төрөл"
            value={messageType}
            onChange={(e) => setMessageType(e.target.value)}
            options={messageTypeOptions}
          />

          {messageType === 'teacher' && (
            <Select
              label="Багш сонгох"
              value={selectedTeacher}
              onChange={(e) => setSelectedTeacher(e.target.value)}
              options={teacherOptions}
            />
          )}

          <Textarea
            label="Сэтгэгдэл"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Багшдаа хандаж сэтгэгдлээ бичээрэй... (хамгийн багадаа 5 тэмдэгт)"
            maxLength={500}
            rows={5}
          />

          {error && (
            <div className="p-3 rounded-xl bg-red-50 text-red-600 text-sm">{error}</div>
          )}

          {success && (
            <div className="p-3 rounded-xl bg-green-50 text-green-600 text-sm">{success}</div>
          )}

          <Button type="submit" disabled={submitting} className="w-full">
            {submitting ? 'Илгээж байна...' : '✨ Илгээх'}
          </Button>
        </form>
      </div>
    </div>
  );
}

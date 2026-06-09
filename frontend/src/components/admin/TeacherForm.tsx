import { useState, useEffect } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import type { Teacher } from '../../types/teacher';

interface TeacherFormProps {
  teacher?: Teacher | null;
  onSubmit: (data: { name: string; subject: string; pinCode: string }) => Promise<void>;
  onCancel: () => void;
}

export function TeacherForm({ teacher, onSubmit, onCancel }: TeacherFormProps) {
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (teacher) {
      setName(teacher.name);
      setSubject(teacher.subject || '');
      setPinCode(teacher.pinCode || '');
    }
  }, [teacher]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setLoading(true);
    try {
      await onSubmit({ name, subject, pinCode });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Багшийн нэр"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Жишээ: Батболд багш"
        required
      />
      <Input
        label="Хичээл (заавал биш)"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        placeholder="Жишээ: Математик"
      />
      <Input
        label="PIN код (заавал биш)"
        value={pinCode}
        onChange={(e) => setPinCode(e.target.value)}
        placeholder="4 оронтой тоо"
        maxLength={10}
      />
      <div className="flex gap-3 pt-2">
        <Button type="submit" disabled={loading}>
          {loading ? 'Хадгалж байна...' : teacher ? 'Шинэчлэх' : 'Нэмэх'}
        </Button>
        <Button type="button" variant="ghost" onClick={onCancel}>
          Болих
        </Button>
      </div>
    </form>
  );
}

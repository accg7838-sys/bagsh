import { useState, useEffect } from 'react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Textarea } from '../../components/ui/Textarea';
import { getAdminHomeLetter, updateHomeLetter } from '../../services/adminService';
import type { HomeLetter } from '../../types/message';

export function AdminHomeLetterPage() {
  const [, setLetter] = useState<HomeLetter | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    getAdminHomeLetter()
      .then((data) => {
        if (data) {
          setLetter(data);
          setTitle(data.title);
          setContent(data.content);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) {
      setMessage('Гарчиг болон агуулга оруулна уу');
      return;
    }
    setSaving(true);
    setMessage('');
    try {
      const updated = await updateHomeLetter(title, content);
      setLetter(updated);
      setMessage('✅ Амжилттай хадгалагдлаа!');
    } catch {
      setMessage('❌ Алдаа гарлаа');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="rounded-[1.75rem] bg-white/60 py-12 text-center font-semibold text-slate/50 ring-1 ring-primary/10">Ачаалж байна...</div>;
  }

  return (
    <div>
      <div className="mb-6">
        <p className="text-sm font-bold uppercase tracking-[0.22em] text-primary-dark/45">Home letter</p>
        <h2 className="mt-1 text-3xl font-black tracking-[-0.04em] text-warm">Нүүр хуудасны захидал</h2>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="soft-card rounded-[1.75rem] p-6 space-y-4">
          <h3 className="text-lg font-black text-warm">Захидал засах</h3>

          <Input
            label="Гарчиг"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Жишээ: Багш нартаа баярлалаа"
          />

          <Textarea
            label="Агуулга"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Нүүр хуудсанд гарах гол захидлыг энд бичнэ үү..."
            rows={10}
          />

          {message && (
            <div className={`rounded-2xl px-4 py-3 text-sm font-semibold ${
              message.startsWith('✅') ? 'bg-green-50 text-green-700 ring-1 ring-green-100' : 'bg-red-50 text-red-600 ring-1 ring-red-100'
            }`}>
              {message}
            </div>
          )}

          <Button onClick={handleSave} disabled={saving}>
            {saving ? 'Хадгалж байна...' : '💾 Хадгалах'}
          </Button>
        </div>

        <div className="soft-card rounded-[1.75rem] p-6">
          <h3 className="mb-4 text-lg font-black text-warm">Урьдчилсан харагдац</h3>
          <div className="rounded-[1.75rem] bg-warm-gradient p-6 text-center ring-1 ring-primary/10">
            <h2 className="mb-4 text-2xl font-black tracking-[-0.03em] text-warm">{title || 'Гарчиг'}</h2>
            <div className="rounded-[1.5rem] bg-white/80 p-6 shadow-inner ring-1 ring-white/70 backdrop-blur-sm">
              <div className="mb-4 text-4xl">💝</div>
              {content ? (
                content.split('\n').map((p, i) => (
                  p.trim() ? (
                    <p key={i} className="mb-3 text-slate/80 leading-8 last:mb-0">{p}</p>
                  ) : (
                    <br key={i} />
                  )
                ))
              ) : (
                <p className="text-slate/40">Захидлын агуулга энд харагдана...</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

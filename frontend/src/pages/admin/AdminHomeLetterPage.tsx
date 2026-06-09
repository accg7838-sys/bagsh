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
    return <div className="text-center py-12 text-slate/50">Ачаалж байна...</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate mb-6">✉️ Нүүр хуудасны захидал</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Editor */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 space-y-4">
          <h3 className="font-semibold text-slate">Захидал засах</h3>

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
            <div className={`p-3 rounded-xl text-sm ${
              message.startsWith('✅') ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
            }`}>
              {message}
            </div>
          )}

          <Button onClick={handleSave} disabled={saving}>
            {saving ? 'Хадгалж байна...' : '💾 Хадгалах'}
          </Button>
        </div>

        {/* Preview */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h3 className="font-semibold text-slate mb-4">Урьдчилсан харагдац</h3>
          <div className="bg-warm-gradient rounded-2xl p-8 border border-rose-100 text-center">
            <h2 className="text-2xl font-bold text-rose-500 mb-4">{title || 'Гарчиг'}</h2>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6">
              <div className="text-3xl mb-4">💝</div>
              {content ? (
                content.split('\n').map((p, i) => (
                  p.trim() ? (
                    <p key={i} className="text-slate/80 leading-relaxed mb-3 last:mb-0">{p}</p>
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

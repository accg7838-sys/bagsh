import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { adminLogin } from '../../services/adminService';

export function AdminLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Email болон нууц үгээ оруулна уу');
      return;
    }

    setLoading(true);
    try {
      await adminLogin(email, password);
      navigate('/admin/dashboard');
    } catch {
      setError('Email эсвэл нууц үг буруу байна');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-warm-gradient px-4 py-8">
      <div className="decorative-grid fixed inset-0 pointer-events-none" />
      <div className="glass-card relative z-10 w-full max-w-sm rounded-[2rem] p-7 sm:p-8">
        <div className="mb-7 text-center">
          <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-3xl bg-gradient-to-br from-primary to-primary-dark text-2xl text-white shadow-lg shadow-primary/25">♥</div>
          <h1 className="text-3xl font-black tracking-[-0.04em] text-warm">Админ нэвтрэх</h1>
          <p className="mt-2 text-sm text-slate/50">Багш нарын талархлын систем</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@teacher.mn"
            type="email"
          />

          <Input
            label="Нууц үг"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="········"
            type="password"
          />

          {error && (
            <div className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600 ring-1 ring-red-100">{error}</div>
          )}

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'Нэвтэрч байна...' : '🚪 Нэвтрэх'}
          </Button>

          <p className="text-center text-xs text-slate/40">
            Анхны нэвтрэх: admin@teacher.mn / admin123
          </p>
          <Link to="/" className="block text-center text-sm font-semibold text-primary-dark/60 no-underline transition hover:text-primary">
            ← Нүүр хуудас
          </Link>
        </form>
      </div>
    </div>
  );
}

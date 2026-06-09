import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
    <div className="min-h-screen bg-warm-gradient flex items-center justify-center px-4">
      <div className="max-w-sm w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-rose-500 mb-2">🌸</h1>
          <h2 className="text-2xl font-bold text-slate">Админ нэвтрэх</h2>
          <p className="text-slate/50 text-sm mt-1">Багшдаа Баярлалаа</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-rose-100 space-y-4">
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
            <div className="p-3 rounded-xl bg-red-50 text-red-600 text-sm">{error}</div>
          )}

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'Нэвтэрч байна...' : '🚪 Нэвтрэх'}
          </Button>

          <p className="text-xs text-center text-slate/40">
            Анхны нэвтрэх: admin@teacher.mn / admin123
          </p>
        </form>
      </div>
    </div>
  );
}

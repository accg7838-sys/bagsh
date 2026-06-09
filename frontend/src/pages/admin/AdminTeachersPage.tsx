import { useState, useEffect, useCallback } from 'react';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { TeacherForm } from '../../components/admin/TeacherForm';
import {
  getAdminTeachers,
  createTeacher,
  updateTeacher,
  deleteTeacher,
} from '../../services/adminService';
import type { Teacher } from '../../types/teacher';

export function AdminTeachersPage() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editTeacher, setEditTeacher] = useState<Teacher | null>(null);

  const fetchTeachers = useCallback(async () => {
    try {
      const data = await getAdminTeachers();
      setTeachers(data);
    } catch {
      setTeachers([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTeachers();
  }, [fetchTeachers]);

  const handleCreate = () => {
    setEditTeacher(null);
    setShowModal(true);
  };

  const handleEdit = (teacher: Teacher) => {
    setEditTeacher(teacher);
    setShowModal(true);
  };

  const handleSubmit = async (data: { name: string; subject: string; pinCode: string }) => {
    if (editTeacher) {
      await updateTeacher(editTeacher.id, data);
    } else {
      await createTeacher(data);
    }
    setShowModal(false);
    fetchTeachers();
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Энэ багшийг устгахдаа итгэлтэй байна уу?')) return;
    await deleteTeacher(id);
    fetchTeachers();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-slate">👩‍🏫 Багш нар</h2>
        <Button onClick={handleCreate}>+ Багш нэмэх</Button>
      </div>

      {loading ? (
        <div className="text-center py-12 text-slate/50">Ачаалж байна...</div>
      ) : teachers.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-gray-200">
          <p className="text-4xl mb-3">👩‍🏫</p>
          <p className="text-slate/50">Одоогоор багш бүртгэгдээгүй байна</p>
          <Button onClick={handleCreate} className="mt-4">+ Багш нэмэх</Button>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-medium text-slate/70">Нэр</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-slate/70">Хичээл</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-slate/70">Slug</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-slate/70">Захидал</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-slate/70">Үйлдэл</th>
              </tr>
            </thead>
            <tbody>
              {teachers.map((teacher) => (
                <tr key={teacher.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-slate">{teacher.name}</td>
                  <td className="py-3 px-4 text-sm text-slate/60">{teacher.subject || '-'}</td>
                  <td className="py-3 px-4 text-sm text-slate/40 font-mono">{teacher.slug}</td>
                  <td className="py-3 px-4 text-sm text-slate/60">{teacher._count?.letters || 0}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => handleEdit(teacher)}
                        className="px-2 py-1 text-xs rounded-lg bg-primary/5 text-primary hover:bg-primary/10 transition-colors cursor-pointer"
                      >
                        ✏️ Засах
                      </button>
                      <button
                        onClick={() => handleDelete(teacher.id)}
                        className="px-2 py-1 text-xs rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition-colors cursor-pointer"
                      >
                        🗑 Устгах
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={editTeacher ? 'Багш засах' : 'Шинэ багш нэмэх'}
      >
        <TeacherForm
          teacher={editTeacher}
          onSubmit={handleSubmit}
          onCancel={() => setShowModal(false)}
        />
      </Modal>
    </div>
  );
}

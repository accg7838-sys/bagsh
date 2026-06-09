/* eslint-disable react-hooks/set-state-in-effect */
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
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-primary-dark/45">Teachers</p>
          <h2 className="mt-1 text-3xl font-black tracking-[-0.04em] text-warm">Багш нар</h2>
        </div>
        <Button onClick={handleCreate}>+ Багш нэмэх</Button>
      </div>

      {loading ? (
        <div className="rounded-[1.75rem] bg-white/60 py-12 text-center font-semibold text-slate/50 ring-1 ring-primary/10">Ачаалж байна...</div>
      ) : teachers.length === 0 ? (
        <div className="soft-card rounded-[1.75rem] p-12 text-center">
          <p className="mb-3 text-5xl">🧑‍🏫</p>
          <p className="font-semibold text-slate/50">Одоогоор багш бүртгэгдээгүй байна</p>
          <Button onClick={handleCreate} className="mt-4">+ Багш нэмэх</Button>
        </div>
      ) : (
        <div className="soft-card overflow-hidden rounded-[1.75rem]">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px]">
              <thead>
                <tr className="border-b border-primary/10">
                  <th className="px-4 py-3 text-left text-sm font-bold text-slate/60">Нэр</th>
                  <th className="px-4 py-3 text-left text-sm font-bold text-slate/60">Хичээл</th>
                  <th className="px-4 py-3 text-left text-sm font-bold text-slate/60">Slug</th>
                  <th className="px-4 py-3 text-left text-sm font-bold text-slate/60">Захидал</th>
                  <th className="px-4 py-3 text-right text-sm font-bold text-slate/60">Үйлдэл</th>
                </tr>
              </thead>
              <tbody>
                {teachers.map((teacher) => (
                  <tr key={teacher.id} className="border-b border-primary/10 transition hover:bg-primary/5">
                    <td className="px-4 py-4 font-black text-warm">{teacher.name}</td>
                    <td className="px-4 py-4 text-sm text-slate/60">{teacher.subject || '-'}</td>
                    <td className="px-4 py-4 font-mono text-sm text-slate/40">{teacher.slug}</td>
                    <td className="px-4 py-4 text-sm font-semibold text-slate/60">{teacher._count?.letters || 0}</td>
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleEdit(teacher)}
                          className="rounded-xl bg-primary/10 px-3 py-2 text-xs font-bold text-primary-dark transition-colors hover:bg-primary/15 cursor-pointer"
                        >
                          ✏️ Засах
                        </button>
                        <button
                          onClick={() => handleDelete(teacher.id)}
                          className="rounded-xl bg-red-50 px-3 py-2 text-xs font-bold text-red-600 transition-colors hover:bg-red-100 cursor-pointer"
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

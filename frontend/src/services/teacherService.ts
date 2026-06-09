import { api } from './api';
import type { Teacher } from '../types/teacher';
import type { TeacherLetter } from '../types/message';

export async function getTeachers(): Promise<Teacher[]> {
  const { data } = await api.get('/teachers');
  return data;
}

export async function getTeacherBySlug(slug: string): Promise<Teacher | null> {
  const { data } = await api.get(`/teacher/${slug}`);
  return data;
}

export async function getTeacherLetters(
  slug: string
): Promise<{ teacher: Teacher; letters: TeacherLetter[] }> {
  const { data } = await api.get(`/teacher/${slug}/letters`);
  return data;
}

export async function verifyTeacherPin(
  slug: string,
  pinCode: string
): Promise<{ verified: boolean; error?: string }> {
  const { data } = await api.post(`/teacher/${slug}/verify-pin`, { pinCode });
  return data;
}

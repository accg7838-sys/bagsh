import { getAdminApi } from './api';
import type { AdminLoginResponse, DashboardData } from '../types/admin';
import type { Teacher } from '../types/teacher';
import type { RainComment, TeacherLetter, HomeLetter } from '../types/message';

export async function adminLogin(email: string, password: string): Promise<AdminLoginResponse> {
  const { data } = await getAdminApi().post('/admin/login', { email, password });
  if (data.token) {
    localStorage.setItem('admin_token', data.token);
  }
  return data;
}

export function adminLogout(): void {
  localStorage.removeItem('admin_token');
}

export function isAdminLoggedIn(): boolean {
  return !!localStorage.getItem('admin_token');
}

// Dashboard
export async function getDashboard(): Promise<DashboardData> {
  const { data } = await getAdminApi().get('/admin/dashboard');
  return data;
}

// Teachers
export async function getAdminTeachers(): Promise<Teacher[]> {
  const { data } = await getAdminApi().get('/admin/teachers');
  return data;
}

export async function createTeacher(teacher: {
  name: string;
  subject?: string;
  pinCode?: string;
}): Promise<Teacher> {
  const { data } = await getAdminApi().post('/admin/teachers', teacher);
  return data;
}

export async function updateTeacher(id: number, teacher: {
  name: string;
  subject?: string;
  pinCode?: string;
}): Promise<Teacher> {
  const { data } = await getAdminApi().put(`/admin/teachers/${id}`, teacher);
  return data;
}

export async function deleteTeacher(id: number): Promise<void> {
  await getAdminApi().delete(`/admin/teachers/${id}`);
}

// Home Letter
export async function getAdminHomeLetter(): Promise<HomeLetter | null> {
  const { data } = await getAdminApi().get('/admin/home-letter');
  return data;
}

export async function updateHomeLetter(title: string, content: string): Promise<HomeLetter> {
  const { data } = await getAdminApi().put('/admin/home-letter', { title, content });
  return data;
}

// Rain Comments
export async function getAdminRainComments(): Promise<RainComment[]> {
  const { data } = await getAdminApi().get('/admin/rain-comments');
  return data;
}

export async function approveRainComment(id: number): Promise<void> {
  await getAdminApi().patch(`/admin/rain-comments/${id}/approve`);
}

export async function rejectRainComment(id: number): Promise<void> {
  await getAdminApi().patch(`/admin/rain-comments/${id}/reject`);
}

export async function deleteRainComment(id: number): Promise<void> {
  await getAdminApi().delete(`/admin/rain-comments/${id}`);
}

// Teacher Letters
export async function getAdminTeacherLetters(): Promise<TeacherLetter[]> {
  const { data } = await getAdminApi().get('/admin/teacher-letters');
  return data;
}

export async function approveTeacherLetter(id: number): Promise<void> {
  await getAdminApi().patch(`/admin/teacher-letters/${id}/approve`);
}

export async function rejectTeacherLetter(id: number): Promise<void> {
  await getAdminApi().patch(`/admin/teacher-letters/${id}/reject`);
}

export async function deleteTeacherLetter(id: number): Promise<void> {
  await getAdminApi().delete(`/admin/teacher-letters/${id}`);
}

// QR
export async function getTeacherQR(teacherId: number): Promise<{
  teacher: { id: number; name: string; slug: string };
  url: string;
  qrCode: string;
}> {
  const { data } = await getAdminApi().get(`/admin/teachers/${teacherId}/qr`);
  return data;
}

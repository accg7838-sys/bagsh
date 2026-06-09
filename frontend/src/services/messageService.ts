import { api } from './api';
import type { RainComment } from '../types/message';

export async function getRainComments(): Promise<RainComment[]> {
  const { data } = await api.get('/rain-comments');
  return data;
}

export async function submitRainComment(comment: {
  studentName: string;
  className?: string;
  content: string;
}): Promise<{ message: string }> {
  const { data } = await api.post('/rain-comments', comment);
  return data;
}

export async function submitTeacherLetter(letter: {
  teacherId: number;
  studentName: string;
  className?: string;
  content: string;
}): Promise<{ message: string }> {
  const { data } = await api.post('/teacher-letters', letter);
  return data;
}

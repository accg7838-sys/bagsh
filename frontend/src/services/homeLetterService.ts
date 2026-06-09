import { api } from './api';
import type { HomeLetter } from '../types/message';

export async function getHomeLetter(): Promise<HomeLetter | null> {
  const { data } = await api.get('/home-letter');
  return data;
}
